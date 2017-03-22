// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import session from './utils/session'
import auth from './api/auth'

// 图片延迟加载
import VueLazyload from 'vue-lazyload'
import defaultImg from './assets/img-loading.png'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: defaultImg,
    loading: defaultImg,
    attempt: 1
});

// 图片过滤
Vue.filter('imageUrlPrefix', (value) => {
    const url = value[0].substr(7)
    const prefix = 'https://images.weserv.nl/?url='
    return prefix + url
});


const vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});


// 路由切换前, 判断是 前进 or 后退
router.beforeEach((to, from, next) => {
    const toPath = to.path
    const fromPath = from.path

    // 判断路由是否需要登录验证
    if (to.matched.some(record => record.meta.requiresAuth )) {
        console.log('是否登录', auth.loggedIn())
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

    /*let historyTo = session.get(to)
    if (historyTo && historyTo.history) {
        console.log('后退')
        historyTo.history = false
        session.set(to, historyTo)
        //Vonic.app.nextDirection('back')
    } else {
        console.log('前进')
        session.set(from || '/', {
            history: true,
        })
        //Vonic.app.nextDirection('forward')
    }*/

    // next()
});



// 路由切换后, 关闭侧边栏
router.afterEach(() => {
    vm.$store.dispatch('hideSideNav')
});