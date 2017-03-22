<template>
    <div class="page page-detail">
        <PageState :state="pageState" v-if="pageStateShow"></PageState>

        <nav-bar :isFixed="true" :goBackAction="true">
            <div class="goback" slot="left" @click="goback">
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>
            <story-extra
                slot="right"
                :message="messageNum"
                :praise="praiseNum"
                :newsId="newsId"
                :isPraised="isPraised"
                :isCollected="isPraised"
                 @praiseHandler="praise"
                 @collectionHandler="collectionToggle"
                 @showActionSheetShareHandler="showActionSheetShare">
            </story-extra>
        </nav-bar>

        <div class="detai-wrapper">
            <div class="detail-headline" v-if="image">
                <div class="detail-headline__img" :style="{ backgroundImage: 'url('+ fixedImageUrl(image) +')' }"></div>
                <div class="detail-headline__title" ref="detailTitle">{{title}}</div>
                <span class="detail-headline__imgsource">{{imageSource}}</span>
            </div>
            <div class="detail-body" v-html="articleBody"></div>
            <div class="detail-from__section" v-if="isShowSection">
                <router-link v-if="isSection" :to="'/section/' + section.id">
                    <img :src="fixedImageUrl(section.thumbnail)" />
                    <span>本文来自 : {{section.name}} · 合集</span>
                    <i class="iconfont icon-arrow-right section-list"></i>
                </router-link>

                <router-link v-else :to="'/theme/' + section.id">
                  <img :src="fixedImageUrl(section.thumbnail)" />
                  <span>本文来自 : {{section.name}} · 合集</span>
                  <i class="iconfont icon-arrow-right section-list"></i>
                </router-link>
            </div>
        </div>

        <action-sheet-share
            ref="actionSheetShare"
            titleText="分享到"
            :shareUrl="shareUrl"
            :shareTitle="shareTitle"
            :shareContent="shareContent"
            :shareImage="shareImage"
        >
        </action-sheet-share>
    </div>
</template>

<script>
import request from '../../api/request'

import NavBar from '../../components/NavBar'
import PageState from '../../components/state/PageState'
import StoryExtra from './storyExtra'
import ActionSheetShare from '../../components/share/ActionSheetShare'

import Toast from '../../components/toast/toast'
import fixedImageUrl from '../../mixins/fixedImageUrl'

export default{
    name: 'theme-detail',
    mixins: [fixedImageUrl],
    data() {
        return {
            articleBody: '',
            title: '',
            image: '',
            imageSource: '',
            isShowSection: false,
            isSection: true,
            section: {},
            messageNum: 0,  // 评论数
            praiseNum: 0,   // 点赞数
            isPraised: false,   // 是否点赞
            isCollected: false, // 是否收藏

            shareUrl: '',
            shareTitle: '',
            shareContent: '',
            shareImage: '',

            cacheRouteFullPath: '', // 缓存的路由
            pageInactive: false,    // 页面是否在缓存状态
            pageState: 1,
            pageStateShow: true,
        }
    },
    computed : {
        newsId() {
            return this.$route.params.id || ''
        }
    },
    components: {
        NavBar, PageState, StoryExtra, ActionSheetShare,
    },
    mounted() {
        this.getNewDetail()
        this.getStoryExtra()
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
                console.log('详情页 =>> 当前路由和缓存的路由不同, 需要重新加载数据')
                // 重新初始化页面 data
                Object.assign(this.$data, this.$options.data())
                // 重新获取详细信息
                this.getNewDetail()
                this.getStoryExtra()
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        // 缓存路由信息
        this.cacheRouteFullPath = from.fullPath
        next();
    },
    methods: {
        goback() {
            window.history.go(-1)
        },
        // 获取详细信息
        getNewDetail() {
            const DETAIL_ID = this.newsId

            request.getNewDetail(DETAIL_ID, (res) => {
                this.articleBody = res.body ? res.body.replace(/<iframe>\r\n\t<\/iframe>/g, '').replace(/src=\"/g, 'src="http://zhihu.garychang.cn/tiny-pic?img=') : '' // 修复图片
                this.title = res.title
                this.image = res.image
                this.imageSource = res.image_source

                // 栏目的信息
                if (res.section) {
                    this.isShowSection = true
                    this.section = res.section
                }
                // 是栏目还是主题
                if (res.theme) {
                    this.isSection = false
                    this.isShowSection = true
                    this.section = res.theme
                }
                this.pageStateShow = false

                // 分享信息
                this.shareUrl = 'https://cn.vuejs.org'  // window.location.href   // hash 地址新浪分享无效
                this.shareTitle = res.title
                this.shareContent = '【' + res.title + '】 - 分享自 Vue 知乎日报'
                this.shareImage = res.image
            }, (err) => {
                console.log(err)
                this.pageState = 0
            });
        },
        // 获取额外信息
        getStoryExtra() {
            const DETAIL_ID = this.newsId

            request.getStoryExtraInfo(DETAIL_ID, (res) => {
                    this.messageNum = res.comments
                    this.praiseNum = res.popularity
            }, (err) => {
                console.log(err);
            });
        },
        // 显示分享弹窗
        showActionSheetShare() {
            //console.log('detail page =>> 显示分享弹窗')
            // 触发子组件的 show 事件
            this.$refs.actionSheetShare.$emit('show')
        },
        praise(ev) {
            if (this.isPraised) {
                Toast({
                    content: '您已点赞'
                })
            } else if (!this.pageStateShow) {
                Toast({
                    content: '点赞成功',
                    position: 'bottom',
                    onCloseCallback: function() {
                        console.log('点赞成功, 关闭弹窗的回调函数')
                    }
                })
                this.isPraised = true
                this.praiseNum += 1

                document.querySelector('.detail-action__praise').className += ' active'
            }
        },
        collectionToggle() {
            if (this.isCollected) {
                this.isCollected = false
                Toast({
                    content: '已取消收藏',
                    position: 'bottom'
                })
                document.querySelector('.detail-action__collection').className = '.detail-action__praise'
            } else {
                this.isCollected = true
                Toast({
                    content: '成功添加至收藏夹',
                    position: 'bottom'
                })
                document.querySelector('.detail-action__collection').className += ' active'
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";
@import "./detail";
//@import url("http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3");

.page-detail {}
.detai-wrapper {
    position: relative;
    overflow: hidden;

    .detail-headline {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: px2rem(408px);

        &__img {
            height: px2rem(408px);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }

        &__title {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            font-size: px2rem(36px);
            line-height: 1.4;
            color: #fff;
            padding: px2rem(200px) px2rem(30px) px2rem(60px);
            background-image:linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0));
        }
        &__imgsource {
            position: absolute;
            bottom: px2rem(20px);
            right: px2rem(20px);
            font-size: px2rem(24px);
            line-height: 1;
            color: #ccc;
        }
    }

    .detail-from__section {
        position: relative;
        margin: px2rem(40px);
        font-size: px2rem(28px);
        /*background-color: #fff;*/

        a {
            color: #222;
            display: block;
            overflow: hidden;
            height: px2rem(100px);
            line-height: px2rem(100px);
            background-color: #e5e5e5;
        }

        img {
            display: block;
            float: left;
            width: px2rem(100px);
            margin-right: px2rem(30px);
        }
        span {
            vertical-align: middle;
        }

        .section-list {
            position: absolute;
            top: 50%;
            right: px2rem(40px);
            background-image: none;
            display: inline-block;
            vertical-align: middle;
            margin-top: px2rem(-15px);
        }
    }
}
</style>
