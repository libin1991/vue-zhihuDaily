<template>
    <div class="page page-comments">
        <nav-bar :isFixed="true" :pageTitle="pageTitle" :goBackAction="true">
            <div class="goback" slot="left" @click="goback">
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>

            <div class="write-review" slot="right">
                <router-link :to="'/review/' + this.$route.params.id"><i class="iconfont icon-write"></i></router-link>
            </div>
        </nav-bar>

        <div class="comments-content">
            <div class="comments-panel long-comments">
                <div class="comments-panel__hd" ref="longCommentsHd">{{ longComments.length }}条长评</div>
                <div class="comments-panel__bd">
                    <div class="loading-state__inline" v-if="longCommentsLoading"><span>正在加载</span></div>
                    <div class="empty empty-comments" v-if="emptyLongComments">
                        <div class="empty-content">
                            <img class="empty-img" src="../../assets/empty-comments.png" />
                            <div class="empty-text">深度长评虚位以待</div>
                        </div>
                    </div>
                    <ListComments v-for="(item, index) in longComments" :data="item"></ListComments>
                </div>
            </div>

            <div class="comments-panel short-comments" v-infinite-scroll="getBeforeShortComments" infinite-scroll-disabled="infiniteBusy" infinite-scroll-distance="1">
                <div class="comments-panel__hd" ref="shortCommentsHd" @click="shortCommentsToggleAction">{{ shortCommentsLength }}条短评</div>
                <div class="comments-panel__bd" v-if="shortCommentsToggle">
                    <ListComments v-for="(item, index) in shortComments" :data="item"></ListComments>

                    <div class="infinite-loading">
                        <div v-if="stateLoadig" class="loading"><span>正在加载</span></div>
                        <div v-if="stateNoMore" class="no-more"><span>没有更多了</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import request from '../../api/request'
import { formatWrapToHtml, scrollTo } from '../../utils/util'
import NavBar from '../../components/NavBar'
import ListComments from '../../components/list/ListComments'

export default{
    data() {
        return {
            longComments: [],
            shortComments: [],
            longCommentsLoading: true, // 长评论正在加载
            emptyLongComments: false,  // 长评论为空提示
            //isInitData: true,   // 是否初始化数据
            //loading: false,
            hasClick: false,
            shortCommentsToggle: false, // 短评论的显示/隐藏

            initialized: false,     // 是否已经初始化数据
            infiniteBusy: false,    // 无限加载是否禁用
            infiniteNoMore: false,  // 无限加载是否没有更多

            cacheRouteFullPath: '', // 缓存的路由
            pageInactive: false,    // 页面是否在缓存状态
        }
    },
    computed : {
        pageTitle() {
            return this.$route.query.count + ' 条点评'
        },
        // 是否显示加载更多监听
        isShowLoadMoreListen() {
            return this.shortComments.length
        },
        // 短评论数量
        shortCommentsLength () {
            return this.$route.query.count - this.longComments.length
        },
        // 正在加载状态
        stateLoadig() {
            return this.infiniteBusy && !this.infiniteNoMore
        },
        // 没有更多状态
        stateNoMore() {
            return this.infiniteNoMore
        }
    },
    components: {
        NavBar, ListComments
    },
    mounted () {
        //setTimeout(() => {
        this.getLongComments()
        //}, 1500)
    },
    activated() {
        this.pageInactive = false
    },
    deactivated() {
        this.pageInactive = true
    },
    watch: {
        // 监听初始化操作
        initialized: function() {
            if (this.initialized) {
                // 滚动定位到短评论位置
                setTimeout(() => {
                    this.scrollTo(this.$refs.shortCommentsHd)
                }, 0)
            }
        },
        shortCommentsToggle: function(val) {
            // 没有短评论内容
            if(!this.shortCommentsLength) {
                return
            }
            // 短评论显示 => 滚动定位到短评论位置;  短评论隐藏 => 滚动定位到长评论位置;
            if (val) {
                // 滚动定位到短评论位置
                console.log('滚动定位到短评论位置')
                setTimeout(() => {
                    this.scrollTo(this.$refs.shortCommentsHd)
                }, 10)
            } else {
                // 滚动定位到长评论位置
                console.log('滚动定位到长评论位置')
                setTimeout(() => {
                    this.scrollTo(this.$refs.longCommentsHd);
                }, 0)
            }
        },
        // 监听路由变化
        $route () {
            if (this.pageInactive) { return false }

            // 当前路由和缓存的路由匹配. 不同 =>> 需要重新加载数据; 相同 =>> 使用缓存的数据
            let enterRouteFullPath = this.$route.fullPath
            if (enterRouteFullPath != this.cacheRouteFullPath) {
                console.log('评论页 =>> 当前路由和缓存的路由不同, 需要重新加载数据')
                // 重新初始化页面 data
                Object.assign(this.$data, this.$options.data())
                // 重新获取评论信息
                this.getLongComments()
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
            window.history.go(-1)
        },
        /**
         * 滚动定位到指定元素位置
         * @params $target
         */
        scrollTo($target) {
            document.body.scrollTop = $target.offsetTop - $target.offsetHeight;
        },
        // 获取长评论
        getLongComments() {
            const COMMENTS_ID = this.$route.params.id

            request.getLongComments(COMMENTS_ID, (res) => {
                // 长评论内容为空
                if (!res.comments.length) {
                    this.emptyLongComments = true
                    this.longCommentsLoading = false
                    return false
                }

                // 长评论内容不为空.
                // 格式化时间和内容
                res.comments.forEach((item, index) => {
                    item.content = formatWrapToHtml(item.content);
                    item.time = moment.unix(item.time).format('MM-DD HH:mm')
                })
                this.longComments = this.longComments.concat(res.comments)
                this.$nextTick(() => {
                    this.longCommentsLoading = false
                })
            }, (err) => {
                console.log(err)
            });
        },
        // 短评论标题点击切换效果
        shortCommentsToggleAction() {
            this.shortCommentsToggle = !this.shortCommentsToggle

            // 未初始化短评论 && 有短评论内容 =>> 获取短评论内容
            if (!this.initialized && this.shortCommentsLength) {
                this.getShortComments()
            }
        },
        // 获取短评论
        getShortComments() {
            console.log('获取短评论')
            this.infiniteBusy = true
            const COMMENTS_ID = this.$route.params.id

            request.getShortComments(COMMENTS_ID, (res) => {
                // 格式化时间和内容
                res.comments.forEach((item, index) => {
                    item.content = formatWrapToHtml(item.content)
                    item.time = moment.unix(item.time).format('MM-DD HH:mm')
                })
                this.shortComments = this.shortComments.concat(res.comments)

                this.$nextTick(() => {
                    this.initialized = true
                    this.infiniteBusy = false
                    this.shortCommentsToggle = true
                })
            }, (err) => {
                console.log(err)
                this.infiniteBusy = false
            })
        },
        // 获取之前短评论
        getBeforeShortComments() {
            // 未初始化 or 正在加载中 or 未显示短评论内容, 不触发事件
            if (!this.initialized || this.infiniteBusy || !this.shortCommentsToggle) {
                return false
            }

            this.infiniteBusy = true
            const COMMENTS_ID = this.$route.params.id
            const LAST_COMMENTS_ID = this.shortComments[this.shortComments.length - 1].id

            request.getBeforeShortComments(COMMENTS_ID, LAST_COMMENTS_ID, (res) => {
                if (res.comments.length) {
                    // 格式化时间 和 '\n' =>> <br/>
                    res.comments.forEach((item, index) => {
                        item.content = formatWrapToHtml(item.content)
                        item.time = moment.unix(item.time).format('MM-DD HH:mm')
                    });
                    this.shortComments = this.shortComments.concat(res.comments)
                    this.infiniteBusy = false
                } else {
                    // 没有更多了
                    this.infiniteBusy = true
                    this.infiniteNoMore = true
                }
            }, (err) => {
                console.log(err);
                this.infiniteBusy = false
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.write-review {
    .iconfont {
        font-size: px2rem(46px);
    }
}

.page-comments {
    min-height: calc(100vh - 1rem);
}
.empty-comments {
    text-align: center;
    font-size: 0;
    min-height: calc(100vh - 1rem - 1.03rem * 2);
    position: relative;

    .empty-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }

    .empty-img {
        width: px2rem(200px);
        height: auto;
    }

    .empty-text {
        max-width: 95%;
        margin: px2rem(20px) auto 0;
        font-size: px2rem(28px);
        color: #ccc;
    }
}
.comments-panel__hd {
    position: relative;
    padding: px2rem(30px) ;
    font-size: px2rem(28px);
    color: #808080;

    &:before {
        content: ''; height: 1px; background-color: #ccc;
        position: absolute; left: 0; right: 0; top: 0;
    }

    &:after {
        content: ''; height: 1px; background-color: #ccc;
        position: absolute; left: 0; right: 0; bottom: 0;
    }
}
.comments-panel__bd {
    padding: 0 px2rem(30px)
}

.long-comments {
    .comments-panel__hd {
        &:before {
            display: none;
        }
    }
}
</style>
