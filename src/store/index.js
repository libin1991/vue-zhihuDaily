import Vue from 'vue'
import Vuex from 'vuex'

import sidebarNav from './modules/sidebarNav'
import login from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sidebarNav,
        login
    },
});