<template>
    <div class="page-theme">
        <PageState :state="pageState" v-if="pageStateShow"></PageState>

        <drawer-sidebar></drawer-sidebar>

        <nav-bar :pageTitle="pageTitle" :isFixed="true" :goBackAction="true"></nav-bar>

        <div class="theme-info" v-if="image">
            <div class="theme-info__img" v-lazy:background-image="fixedImageUrl(image)"></div>
            <div class="theme-info__desc">{{description}}</div>
        </div>

        <div class="content-section" v-infinite-scroll="getBeforeThemeList" infinite-scroll-disabled="infiniteBusy" infinite-scroll-distance="1">
            <editor :data="editors" :id="themeId" v-if="editors.length"></editor>
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
import { mapGetters, mapActions } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import request from '../../api/request'
import NavBar from '../../components/NavBar'
import DrawerSidebar from '../../pages/DrawerSidebar'
import Panel from '../../components/panel/PanelSimple'
import List from '../../components/list/List'
import Editor from './Editor'
import PageState from '../../components/state/PageState'

import fixedImageUrl from '../../mixins/fixedImageUrl'

export default {
    name: 'theme-list',
    mixins: [fixedImageUrl],
    data() {
        return {
            pageTitle: "",
            description: '',
            image: '',
            stories: [],
            editors: [],

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
        NavBar, DrawerSidebar, Panel, List, Editor, PageState
    },
    computed: {
        ...mapGetters(['themesList']),
        themeId() {
            return this.$route.params.id || '';
        },
        // 正在加载状态
        stateLoadig() {
            return this.initialized && this.infiniteBusy && !this.infiniteNoMore
        },
        // 没有更多状态
        stateNoMore() {
            return this.infiniteNoMore
        }
    },
    mounted() {
        this.getThemeList()
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
                // 重新初获取栏目列表内容
                this.getThemeList()
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        // 缓存路由信息
        this.cacheRouteFullPath = from.fullPath
        next()
    },
    methods: {
        // 初始化栏目列表内容
        getThemeList() {
            //console.log('初始化栏目列表内容')
            this.infiniteBusy = true
            const THEME_ID = this.themeId

            request.getThemeList(THEME_ID, (res) => {
                this.pageTitle = res.name
                this.image = res.image
                this.description = res.description
                this.editors = res.editors
                this.stories = this.stories.concat(res.stories)

                // DOM 更新完
                this.$nextTick(() => {
                    this.infiniteBusy = false
                    this.initialized = true
                    this.pageStateShow = false
                })
            }, (err) => {
                console.log(err)
                this.infiniteBusy = false
                this.pageState = 0
            });
        },
        // 加载以往栏目列表内容
        getBeforeThemeList() {
            // 未初始化 or 正在加载中 or 页面进入缓存状态, 不触发事件
            if (!this.initialized || this.infiniteBusy || this.pageInactive) {
                return false
            }

            //console.log('加载更多栏目列表内容')
            this.infiniteBusy = true
            const THEME_ID = this.themeId
            const LAST_THEME_ID = this.stories[this.stories.length - 1].id

            request.getBeforeThemeList(THEME_ID, LAST_THEME_ID, (res) => {
                if (res.stories.length) {
                    this.stories = this.stories.concat(res.stories)
                    this.infiniteBusy = false
                } else {
                    // 没有更多了
                    this.infiniteBusy = true
                    this.infiniteNoMore = true
                }
            }, (err) => {
                console.log(err)
                this.infiniteBusy = false
            });
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.theme-info {
    position: relative;
    height: px2rem(400px);
    background-color: #999;
    overflow: hidden;

    &__img {
        height: px2rem(448px);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        -webkit-animation-name: skyset;
        -webkit-animation-duration: 40s;
        -webkit-animation-iteration-count: infinite; /*无限循环*/
        -webkit-animation-timing-function: linear;
    }

    &__desc {
        position: absolute;
        padding: px2rem(40px);
        left: 0;
        right: 0;
        bottom: 0;
        font-size: px2rem(36px);
        color: #fff;
    }
}

@-webkit-keyframes skyset {
    0% { transform: translate(0, 0) scale(1.5); }
    25% { transform: translate(8%, 4%) scale(1.2); }
    50% { transform: translate(4%, 8%) scale(1.2); }
    75% { transform: translate(-2%, 0%) scale(1.3); }
    100% { transform: translate(0, 0) scale(1.5); }
}
</style>
