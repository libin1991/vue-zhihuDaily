<template>
    <div class="page page-about">
        <nav-bar pageTitle="关于" isFixed>
            <div class="goback" slot="left" @click="goback">
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>
        </nav-bar>

        <div class="content">
            <p class="logo-img text-center"><img src="../../assets/logo-zhihu.png" alt="知乎日报" /></p>
            <h3>版权声明</h3>
            <p>本软件与其代码非由知乎创作或维护，其中的所有内容均可在知乎获取。</p>

            <h3>API</h3>
            <p>api来源于 <a href="https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90" target="_blank">izzyleung</a>。</p>
            <p>图片会提示图片只允许在知乎使用，若直接使用api返回的图片地址，知乎会直接返回403，这里直接使用了<a href="https://github.com/GaryChangCN/zhihu-daily-byVuejs" target="_blank">GaryChangCN</a>提供的 node 来代理更改referer头获取图片。</p>

            <h3>功能</h3>
            <ul>
                <li>查看最新消息</li>
                <li>查看以往消息</li>
                <li>主题类别</li>
                <li>主题列表</li>
                <li>查看主题以往列表</li>
                <li>
                    主题详情内容
                    <ul>
                        <li>分享</li>
                        <li>收藏 - 模拟</li>
                        <li>点赞 - 模拟</li>
                        <li>
                            评论
                            <ul>
                                <li>评论列表</li>
                                <li>发表评论 - 模拟</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    主编
                    <ul>
                        <li>主编列表</li>
                        <li>主编详情</li>
                    </ul>
                </li>
                <li>我的收藏 - 无收藏</li>
                <li>登录 - 模拟请求</li>
                <li>个人中心</li>
            </ul>

            <h3>库与组件</h3>
            <p>该项目使用vue-cli构建、打包，配合vue全家桶（vue、vuex、vue-router）进行编码、开发</p>
            <ul>
                <li>网络请求使用 axios</li>
                <li>日期时间格式化使用 moment</li>
                <li>二维码生成 v-qrcode</li>
                <li>图片轮换 vue-awesome-swiper</li>
                <li>下拉无限加载 vue-infinite-scroll</li>
                <li>图片懒加载 vue-lazyload</li>
            </ul>

            <h3>其他</h3>
            <ul>
                <li>侧边栏展开关闭使用 vuex</li>
                <li>是否登录 与 登录请求的状态使用 vuex</li>
            </ul>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar'

export default {
    name: 'about',
    components: {
        NavBar
    },
    methods: {
        goback() {
            window.history.go(-1)
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.page-about {
    .content {
        padding: px2rem(40px);

        h3 {
            margin: px2rem(60px) 0 px2rem(30px);
            color: #000;
        }

        p {
            margin: px2rem(20px) 0;
        }

        ul {
            margin: px2rem(16px) 0 px2rem(16px) px2rem(40px);

            li {
                list-style: disc;
                padding: px2rem(6px) 0;
            }
        }

        .text-center {
            text-align: center;
        }

        .logo-img {
            margin-bottom: px2rem(80px);

            img {
                width: px2rem(250px);
            }
        }
    }
}
</style>