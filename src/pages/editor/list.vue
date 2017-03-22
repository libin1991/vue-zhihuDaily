<template>
    <div class="page-editor">
        <PageState :state="pageState" v-if="pageStateShow"></PageState>

        <nav-bar :pageTitle="pageTitle" :isFixed="true" :goBackAction="true">
            <div class="goback"
                 slot="left"
                 @click="goback"
            >
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>
        </nav-bar>

        <div class="content-section">
            <list-menu v-for="(item, index) in editors" :data="item"></list-menu>
        </div>
    </div>
</template>


<script>
import request from '../../api/request'

import NavBar from '../../components/NavBar'
import Panel from '../../components/panel/PanelSimple'
import ListMenu from '../../components/list/ListMenu'
import PageState from '../../components/state/PageState'

export default{
    name: 'editor-list',
    data() {
        return {
            pageTitle: "主编",
            editors: [],
            cacheRouteFullPath: '', // 缓存的路由
            pageInactive: false,    // 页面是否在缓存状态

            pageState: 1,
            pageStateShow: true
        }
    },
    components: {
        NavBar, Panel, ListMenu, PageState
    },
    mounted() {
        this.getEditorList();
    },
    activated() {
        this.pageInactive = false
    },
    deactivated() {
        this.pageInactive = true
    },
    watch: {
        // 监听路由变化
        $route () {
            if (this.pageInactive) { return false }

            // 当前路由和缓存的路由匹配. 不同 =>> 需要重新加载数据; 相同 =>> 使用缓存的数据
            let enterRouteFullPath = this.$route.fullPath
            if (enterRouteFullPath != this.cacheRouteFullPath) {
                // 重新初始化页面 data
                Object.assign(this.$data, this.$options.data())
                // 重新获取评论信息
                this.getEditorList()
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        // 缓存路由信息
        this.cacheRouteFullPath = from.fullPath
        next()
    },
    methods: {
        goback() {
            window.history.go(-1);
        },
        // 获取编辑表信息
        getEditorList() {
            const EDITOR_LIST_ID = this.$route.params.id

            request.getEditorList(EDITOR_LIST_ID, (res) => {
                this.editors = res.editors

                // 根据主编类型渲染不同的详情. id=0 没有个人主页
                this.editors.forEach((item, index) => {
                    item.url = item.id != 0 ? '#/editordetail/' + item.id : 'https://zhuanlan.zhihu.com/p/19871622?columnSlug=daily'
                })

                // DOM 更新完
                this.$nextTick(() => {
                    this.pageStateShow = false
                })
            }, (err) => {
                console.log(err)
                this.pageStateShow = false
                this.pageState = 0
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.page-editor {
   min-height: calc(100vh - 1rem);
   background-color: #fff;
}
</style>
