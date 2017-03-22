<template>
    <div class="page page-home">
        <PageState :state="pageState" @errorHandler="loadErrorAction" v-if="pageStateShow"></PageState>

        <drawer-sidebar></drawer-sidebar>

        <nav-bar pageTitle="首页" isFixed>
            <popover-menu
                ref="popoverMenuSetting"
                slot="right"
                iconClass="icon-more-android"
            >
                <v-menu-item @click="comingsoom('个性化设置即将上线')" disabled title="设置" leftIconClass="icon-write" />
                <v-menu-item @click="comingsoom('夜间模式即将上线')" disabled title="夜间模式" leftIconClass="icon-collection-fill" />
                <divider/>
                <v-menu-item @click="goRouter('about')" title="关于" leftIconClass="icon-send-fill" />
            </popover-menu>
        </nav-bar>

        <div class="content-container">
            <swiper :options="swiperOption" class="swiper-box">
                <swiper-slide class="swiper-item" v-for="(item, index) in topStories" :key="item.index">
                    <router-link :to="'/detail/' + item.id">
                        <div class="swiper-item__img" v-lazy:background-image="fixedImageUrl(item.image)"></div>
                        <div class="swiper-item__title" v-text="item.title"></div>
                    </router-link>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

            <div class="content-news" v-infinite-scroll="getBeforeNews" infinite-scroll-disabled="infiniteBusy" infinite-scroll-distance="1">
                <panel v-for="(item, index) in stories" :panelTitle="item.title" :key="item.index">
                    <list v-for="(item, index) in item.stories" :data="item"></list>
                </panel>
                <div class="infinite-loading">
                    <div v-if="stateLoadig" class="loading"><span>正在加载</span></div>
                    <div v-if="stateNoMore" class="no-more"><span>没有更多了</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import request from '../../api/request'
import NavBar from '../../components/NavBar'
import PopoverMenu from '../../components/popoverMenu/index'
import {MenuItem} from '../../components/menu/index'
import Divider from '../../components/divider/index'
import DrawerSidebar from '../../pages/DrawerSidebar'
import Panel from '../../components/panel/PanelSimple'
import List from '../../components/list/List'
import PageState from '../../components/state/PageState'

import Toast from '../../components/toast/toast'
import fixedImageUrl from '../../mixins/fixedImageUrl'

// 中文格式化
moment.locale('zh-cn', {
    weekdays : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    ordinalParse: /\d{1,2}(日|月|周)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    }
});


export default{
    mixins: [fixedImageUrl],
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                slidesPerView: 1,
                paginationClickable: true,
                mousewheelControl: true,
                autoplay: 3500,
                autoplayDisableOnInteraction: false
            },
            topStories: [],
            stories: [],

            initialized: false,     // 是否已经初始化数据
            infiniteBusy: false,    // 无限加载是否正在执行
            infiniteNoMore: false,  // 无限加载是否没有更多
            pageInactive: false,    // 页面是否在缓存状态
            pageState: 1,
            pageStateShow: true
        }
    },
    components: {
        swiper, swiperSlide,
        NavBar, PopoverMenu, 'v-menu-item': MenuItem, Divider, DrawerSidebar, Panel, List, PageState
    },
    computed: {
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
        this.getNewLatest()
    },
    activated() {
        this.pageInactive = false
    },
    deactivated() {
        this.pageInactive = true
        // 触发子组件的 onClose 事件
        this.$refs.popoverMenuSetting.$emit('onClose')
    },
    methods: {
        // 获取最新新闻数据
        getNewLatest() {
            this.infiniteBusy = true
            request.getNewsLatest((res) => {
                this.topStories = res.top_stories

                // 一组新闻
                let storiesGroup = {
                    title: '今日要闻',
                    stories: res.stories,
                    date: moment().format('YYYYMMDD')
                }

                this.stories.push(storiesGroup)

                // DOM 更新
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
        // 加载更多数据
        getBeforeNews() {
            // 未初始化 or 正在加载中
            if (!this.initialized || this.infiniteBusy || this.pageInactive) {
                return false
            }

            this.infiniteBusy = true
            let beforeDate = this.stories[this.stories.length - 1].date
            console.log('加载'+ beforeDate +'前一天的数据...');

            request.getBeforeNews(beforeDate, (res) => {
                //console.log(res)
                // 一组新闻
                let storiesGroup = {
                    title: moment(res.date).format('MoDo dddd'),
                    stories: res.stories,
                    date: res.date
                }

                this.$nextTick(() => {
                    this.stories = this.stories.concat(storiesGroup)
                    this.infiniteBusy = false
                })
            }, (err) => {
                console.log(err)
                this.infiniteBusy = false
            });
        },
        // 加载失败, 请重试....
        loadErrorAction() {
            if (this.pageState == 0) {
                // 重新初始化页面 data
                Object.assign(this.$data, this.$options.data())
                // 重新请求数据
                setTimeout(()=>{ this.getNewLatest() }, 500)
            }
        },
        goRouter(location) {
            this.$router.push(location)
        },
        comingsoom(text) {
            Toast({
                content: text,
                position: 'bottom',
                overlay: false
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.swiper-slide {
    position: relative;

    .swiper-item__img {
        height: px2rem(600px);
        background-position: center ;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .swiper-item__title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: px2rem(36px);
        line-height: 1.5;
        color: #fff;
        padding: px2rem(20px) px2rem(40px) px2rem(60px);
        background-image:linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0));

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.swiper-pagination {
    line-height: 1;
}
.swiper-pagination-bullet {
    width: px2rem(16px) !important;
    height: px2rem(16px) !important;
    background-color: #fff !important;
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: px2rem(10px);
}
</style>
