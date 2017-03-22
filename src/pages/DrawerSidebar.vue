<template>
    <div class="drawer-sidebar drawer-sidebar-left"
        :class="{active: isOpen}"
    >
        <div class="drawer-overlay" @click="hideSideNav" @touchmove.prevent></div>
        <div class="drawer-content">
            <div class="drawer-content-extra">
                <div class="user" @click="hideSideNav">
                    <router-link to="/login" v-if="!isLoggedIn">
                        <div class="user-img"><img src="../assets/default-avatar.jpg" /></div>
                        <span>请登录</span>
                    </router-link>
                    <router-link to="/my" v-else-if="isLoggedIn">
                        <div class="user-img"><img src="../assets/user.jpg" /></div>
                        <span>方雨_Yu</span>
                    </router-link>
                </div>

                <div class="user-nav flex">
                    <div class="flex-1" @click="hideSideNav">
                        <router-link to="/favorites">
                            <i class="iconfont icon-start-fill"></i>
                            我的收藏
                        </router-link>
                    </div>
                    <div class="flex-1" @click="hideSideNav">
                        <a href="http://www.baidu.com" target="_blank">
                            <i class="iconfont icon-download-fill"></i>
                            项目下载
                        </a>
                    </div>
                </div>
            </div>
            <div class="sidebar-nav">
                <div class="nav-home" @click="hideSideNav">
                    <router-link to="/" exact>
                        <i class="iconfont icon-home-fill"></i>
                        <span>首页</span>
                    </router-link>
                </div>
                <div class="nav-channel">
                    <ul>
                        <li v-for="(item, index) in themesList" :key="item.id" @click="hideSideNav">
                            <router-link :to="'/theme/' + item.id">
                                <span v-text="item.name"></span>
                                <i class="iconfont icon-subscribed" v-show="!item.subscribed"></i>
                                <i class="iconfont icon-arrow-right" v-show="item.subscribed"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default{
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['isOpen', 'themesList', 'isLoggedIn'])
    },
    mounted() {
        this.checkLoggedIn()
        this.getThemesList()
    },
    methods: {
        ...mapActions(['toggleSideNav', 'hideSideNav', 'getThemesList', 'checkLoggedIn'])
    }
}
</script>

<style lang="scss">
@import "../style/index";

.drawer-sidebar {

    &-left {
        .drawer-content {
            transform: translateX(-100%);
        }

        &.active {
            .drawer-content {
                transform: translateX(0%);
            }
        }
    }

    &.active {
        visibility: visible;

        .drawer-overlay {
            opacity: 1;
            visibility: visible;
        }
    }
}

.drawer-overlay, .drawer-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.drawer-overlay {
    z-index: 20;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity .3s cubic-bezier(1, 1, 1, 1);
}
.drawer-content {
    z-index: 21;
    width: 70%;
    max-width: px2rem(600px);
    background-color: #fff;
    overflow: auto;

    transition: transform .3s cubic-bezier(0.23, 1, 0.32, 1);;
    will-change: transform;
}

.drawer-content-extra {
    background-color: $primary-color;
    color: #fff;
    padding: px2rem(30px) px2rem(40px);

    a {
        color: #fff;
    }

    .user {
        margin-bottom: px2rem(20px);

        a {
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .user-img {
            width: px2rem(60px);
            height: px2rem(60px);

            img {
                display: block;
                width: 100%;
                height: 100%;
                vertical-align: middle;
                border-radius: 99999px;
            }
        }

        span {
            flex: 1;
            margin-left: px2rem(30px);
            font-size: px2rem(28px);
        }
    }

    .user-nav {
        padding-top: px2rem(40px);
        font-size: px2rem(28px);

        .iconfont {
            margin-right: px2rem(20px);
        }
    }
}

.nav-home {
    a,
    a:hover {
        display: block;
        padding: px2rem(30px) px2rem(40px);
        color: $primary-color;

        &.router-link-active {
            background-color: #f0f0f0;
        }
    }
    span {
        vertical-align: middle;
    }
}
.nav-channel {
    li {
        a,
        a:hover {
            position: relative;
            display: block;
            padding: px2rem(30px) px2rem(40px);
            color: #222;

            .iconfont {
                position: absolute;
                right: px2rem(90px);
                top: px2rem(32px);
            }

            &.router-link-active {
                background-color: #f0f0f0;
            }
        }

        &.active {
            a {
                background-color: #f0f0f0;
            }
        }
    }
}
</style>
