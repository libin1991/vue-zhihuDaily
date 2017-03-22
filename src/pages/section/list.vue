<template>
    <div class="page-section">
        <PageState :state="pageState" v-if="pageStateShow"></PageState>

        <nav-bar :pageTitle="pageTitle" :isFixed="true" :goBackAction="true">
            <div class="goback" slot="left" @click="goback">
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>
        </nav-bar>

        <div class="content-section" v-infinite-scroll="getSectionBeforeNews" infinite-scroll-disabled="infiniteBusy" infinite-scroll-distance="1">
            <panel>
                <list v-for="(item, index) in stories" :data="item"></list>
            </panel>
            <div class="infinite-loading">
                <div v-if="stateLoadig" class="loading"><span>正在加载</span></div>
                <div v-if="stateNoMore" class="no-more"><span>没有更多了</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import request from '../../api/request'
import NavBar from '../../components/NavBar'
import Panel from '../../components/panel/PanelSimple'
import List from '../../components/list/List'
import PageState from '../../components/state/PageState'

export default{
    data(){
        return {
            pageTitle: "知乎日报",
            stories: [],
            timestamp: '',

            initialized: false,     // 是否已经初始化数据
            infiniteBusy: false,    // 无限加载是否禁用
            infiniteNoMore: false,  // 无限加载是否没有更多

            cacheRouteFullPath: '', // 缓存的路由
            pageInactive: false,    // 页面是否在缓存状态
            pageState: 1,
            pageStateShow: true
        }
    },
    components: {
        NavBar, Panel, List, PageState
    },
    computed: {
        // 正在加载状态
        stateLoadig() {
            return this.infiniteBusy && !this.infiniteNoMore
        },
        // 没有更多状态
        stateNoMore() {
            return this.infiniteNoMore
        }
    },
    mounted() {
       this.getSectionNews()
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

            // 当前路由和缓存的路由不同, 需要重新加载数据
            let enterRouteFullPath = this.$route.fullPath
            if (enterRouteFullPath != this.cacheRouteFullPath) {
                console.log('当前路由和缓存的路由不同, 需要重新加载数据');

                // 重新初始化页面 data
                Object.assign(this.$data, this.$options.data())
                // 重新获取栏目新闻
                this.getSectionNews()
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        // 缓存路由信息
        this.cacheRouteFullPath = from.fullPath
        next()
    },
    methods: {
        goback() {
            window.history.go(-1)
        },
        // 获取栏目新闻
        getSectionNews() {
            const SECTION_LIST_ID = this.$route.params.id

            request.getSectionNews(SECTION_LIST_ID, (res) => {
                this.pageTitle = res.name
                this.stories = this.stories.concat(res.stories)
                this.timestamp = res.timestamp
                //this.loading = false
                this.initialized = true
                this.pageStateShow = false
            }, (err) => {
                console.log(err)
                this.pageState = 0
            })
        },
        // 获取栏目之前的新闻
        getSectionBeforeNews() {
            // 未初始化 or 正在加载中 or 页面进入缓存状态, 不触发事件
            if (!this.initialized || this.infiniteBusy || this.pageInactive) {
                return false
            }

            console.log('加载栏目之前的新闻');
            this.infiniteBusy = true
            let timestamp = this.timestamp
            const SECTION_LIST_ID = this.$route.params.id

            request.getSectionBeforeNews(SECTION_LIST_ID, timestamp, (res) => {
                if (res.stories.length) {
                    this.stories = this.stories.concat(res.stories)
                    this.timestamp = res.timestamp
                    this.infiniteBusy = false
                } else {
                    // 没有更多了
                    this.infiniteBusy = true
                    this.infiniteNoMore = true
                }
            }, (err) => {
                console.log(err)
                this.infiniteBusy = false
            })
        }
    }
}
</script>