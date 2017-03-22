<template>
    <div class="page page-review">
        <nav-bar :isFixed="true" :pageTitle="pageTitle" :goBackAction="true">
            <div class="goback" slot="left" @click="goback">
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>

            <div class="submit-review" slot="right">
                <span @click="submitReview"><i class="iconfont icon-send-fill"></i></span>
            </div>

        </nav-bar>

        <div class="review-content">
            <div class="textarea-wrapper">
                <textarea class="review-textarea" v-model="review" placeholder="不友善言论会被删除，深度评论会被优先展示"></textarea>
            </div>
            <div class="review-share flex">
                <span class="review-share__hd">同时分享到 : </span>
                <div class="review-share__bd flex-1">
                    <img class="icon-share" src="../../assets/icon-share-sina.png" />
                    <img class="icon-share" src="../../assets/icon-share-qq.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../../api/request'
import NavBar from '../../components/NavBar'
import Toast from '../../components/toast/toast'

export default{
    data() {
        return {
            pageTitle: '写点评',
            review: '',

            cacheRouteFullPath: '', // 缓存的路由
            pageInactive: false,    // 页面是否在缓存状态
        }
    },
    computed : {

    },
    components: {
        NavBar
    },
    mounted () {

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
        submitReview() {
            if (this.review.trim() == '') {
                Toast({
                    content: '点评不能为空',
                    duration: 1500,
                })
            } else {
                const submiting = Toast({
                    content: '正在发表',
                    icon: 'loading',
                    duration: 0
                })

                setTimeout(() => {
                    submiting.update({
                        content: '发表成功',
                        icon: 'success',
                        duration: 1500,
                        onCloseCallback: () => {
                            console.log('跳转回去新闻：' + this.$route.params.id)
                            // @TODO 切换动画 back();  forward()
                            this.$router.go(-1)
                        }
                    })
                }, 3000)
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.page-review {
    background-color: #fff;
}
.submit-review {
    padding: 0 px2rem(10px);

    .iconfont {
        font-size: px2rem(40px);
    }
}
.review-content {
    height: calc(100vh - 1rem);
    display: flex;
    flex-direction: column;
}
.textarea-wrapper {
    flex: 1;
    display: flex;
}
.review-textarea {
    border: none;
    width: 100%;
    padding: px2rem(20px);
    font-size: px2rem(32px);
    color: #666;
    border-bottom: 2px solid $primary-color;
}
.review-share {
    padding: px2rem(30px) px2rem(20px);

    &__hd {
        margin-right: px2rem(20px);
        font-size: px2rem(28px);
        color: #808080;
        vertical-align: middle;
    }

    &__bd {
        font-size: 0;

        .icon-share {
            margin-right: px2rem(20px);
            width: px2rem(40px);

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>

