<template>
    <div class="page page-user">
        <nav-bar :isFixed="true" :pageTitle="pageTitle"></nav-bar>
        <drawer-sidebar></drawer-sidebar>

        <div class="content">
            <div class="user-info">
                <p class="user-avatar"><img src="../../assets/user.jpg" alt="" /></p>
                <p class="user-name">方雨_Yu</p>
            </div>
            <div class="box">
                <div class="box-hd">个人信息</div>
                <div class="box-bd">
                    <div class="cell">
                        <div class="cell-hd">QQ</div>
                        <div class="cell-bd">304683191@qq.com</div>
                    </div>
                    <div class="cell">
                        <div class="cell-hd">手机</div>
                        <div class="cell-bd">15911111111</div>
                    </div>
                    <div class="cell">
                        <div class="cell-hd">GitHub</div>
                        <div class="cell-bd"><a href="https://github.com/sufangyu" target="_blank">方雨_Yu</a></div>
                    </div>
                    <div class="cell">
                        <div class="cell-hd">地址</div>
                        <div class="cell-bd info-default">未填写</div>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="box-hd">个人介绍</div>
                <div class="box-bd">
                    <div class="user-introduce info-default">这个人懒死了, 什么都没有写 (╯-╰)</div>
                </div>
            </div>

            <div class="box box-no-hd">
                <div class="box-bd">
                    <a href="javascript:;" class="logout" @click="logoutHandler">退出登录</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import auth from '../../api/auth'
import NavBar from '../../components/NavBar'
import DrawerSidebar from '../../pages/DrawerSidebar'
import Toast from '../../components/toast/toast'

export default {
    data() {
        return {
            pageTitle: '我的'
        }
    },
    components: {
        NavBar, DrawerSidebar
    },
    beforeRouteEnter: (to, from, next) => {
        // 判断路由是否需要登录验证
        if (to.matched.some(record => record.meta.requiresAuth )) {
            // 验证是否已登录
            if (!auth.loggedIn()) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        } else {
            next()
        }
    },
    methods: {
        logoutHandler() {
            console.log('退出登录成功, 跳转到首页')
            this.$store.dispatch('logout')
            this.$router.replace('/')
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.user-info {
    /*background-color: #e5e5e5;*/
    text-align: center;
    padding: px2rem(50px) 0;

    p {
        margin: 0;
    }
    .user-avatar {
        font-size: 0;
        width: px2rem(180px);
        height: px2rem(180px);
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    .user-name {
        margin-top: px2rem(20px);
    }
}

.box {
    &-no-hd {
        margin-top: px2rem(40px)
    }

    &-hd {
        padding: px2rem(26px) px2rem(30px);
        font-size: px2rem(24px);
        color: #bdbdbd;
    }

    &-bd {
        background-color: #fff;
        font-size: px2rem(28px);
    }

    .info-default {
        color: #ccc;
    }
}
.cell {
    display: flex;
    padding: px2rem(28px) px2rem(30px);
    border-bottom: 1px solid #ddd;

    &:last-child {
        border-bottom: none;
    }

    a {
        display: block;
        position: relative;
        color: #666;

        &:before, &:after {
            content: "";
            display: block;
            height: 0;
            width: 0;
            line-height: 0;
            position: absolute;
            top: px2rem(6px);
            border-width: px2rem(16px);
            border-style: solid;
        }
        &:before {
            right: px2rem(14px);
            border-color: transparent transparent transparent #808080;
        }
        &:after {
            border-color: transparent transparent transparent #fff;
            right: px2rem(17px);
        }
    }

    &-hd {
        width: px2rem(100px);
        margin-right: px2rem(20px);
        color: #999;
    }
    &-bd {
        flex: 1;
    }
}

.user-introduce {
    padding: px2rem(30px);
    min-height: px2rem(250px);
}

.logout {
    display: block;
    color: $primary-color;
    padding: px2rem(20px) 0;
    text-align: center;
}
</style>