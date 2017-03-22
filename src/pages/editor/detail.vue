<template>
    <div class="page-editor page-editor__detail">
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

        <div class="content-section" v-html="body"></div>
    </div>
</template>


<script>
import request from '../../api/request'

import { browser} from '../../utils/util'
import NavBar from '../../components/NavBar'
import PageState from '../../components/state/PageState'

export default {
    name: 'editor-detail',
    data() {
        return {
            pageTitle: "主编资料",
            body: '',

            cacheRouteFullPath: '', // 缓存的路由
            pageInactive: false,    // 页面是否在缓存状态

            pageState: 1,
            pageStateShow: true
        }
    },
    components: {
        NavBar, PageState
    },
    mounted() {
         this.getEditorDetail();
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
                this.getEditorDetail()
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
        // 获取主编详细信息
        getEditorDetail() {
            const Editor_ID = this.$route.params.id
            const SYSTEM = browser.info.android ? 'android' : 'ios'

            request.getEditorDetail(Editor_ID, SYSTEM, (res) => {
                let bodyStart = res.indexOf('<body class="">') + '<body class="">'.length
                let bodyEnd = res.indexOf('</body>')
                let bodyContent = res.substring(bodyStart, bodyEnd)
                bodyContent = bodyContent.replace(/<img src=\"/g, '<img src="http://zhihu.garychang.cn/tiny-pic?img=') // 修复图片
                this.body = bodyContent

                // DOM 更新完
                this.$nextTick(() => {
                    this.pageStateShow = false
                })
            }, (err) => {
                console.log(err)
                this.pageState = 0
            })
        }
    }
}
</script>

<style lang="scss">
@import "editor.scss";
.page-editor__detail {
  min-height: calc(100vh - 1rem);
  background-color: #fff;
}
</style>
