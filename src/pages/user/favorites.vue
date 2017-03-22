<template>
    <div class="page page-favorites">
        <PageState :state="pageState" @errorHandler="loadErrorAction" v-if="pageStateShow"></PageState>

        <nav-bar :isFixed="true" :pageTitle="pageTitle"></nav-bar>
        <drawer-sidebar></drawer-sidebar>

        <div class="content">
            <div class="page-state__empty empty-favorites" v-if="favoritesEmpty">
                <div class="page-state__image"><img src="../../assets/empty-favorites.png" /></div>
                <div class="page-state__text">暂时没有收藏任何内容~</div>
            </div>
        </div>
    </div>
</template>


<script>
import auth from '../../api/auth'
import NavBar from '../../components/NavBar'
import DrawerSidebar from '../../pages/DrawerSidebar'
import PageState from '../../components/state/PageState'

export default {
    data() {
        return {
            favorites: [],
            favoritesEmpty: false,

            pageState: 1,
            pageStateShow: true
        }
    },
    computed: {
        pageTitle() {
            let count = this.favorites.length
            return count + ' 条收藏'
        }
    },
    components: {
        NavBar, DrawerSidebar, PageState
    },
    mounted() {
        setTimeout(() => {
            this.getFavorites()
        }, 2000)
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
    activated() {
        this.pageInactive = false
    },
    deactivated() {
        this.pageInactive = true
    },
    methods: {
        getFavorites() {
            this.favorites = []
            this.favoritesEmpty = true
            this.pageStateShow = false
        },
        loadErrorAction() {
            this.getFavorites()
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.user-info {
    background-color: #e5e5e5;
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
}
.cell {
    display: flex;
    padding: px2rem(20px) px2rem(30px);
    border-bottom: 1px solid #ddd;

    &:last-child {
        border-bottom: none;
    }

    &-hd {
        width: px2rem(60px);
        margin-right: px2rem(20px);
        color: #999;
        text-align: right;
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