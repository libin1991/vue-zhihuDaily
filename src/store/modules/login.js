/**
 * Created by 方雨 on 2017/3/12.
 */
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CHECK_LOGGED_IN,
    LOGIN_OUT,
}
from '../constants.js'
import auth from '../../api/auth'


// state 定义初始化数据
const state = {
    isLoggedIn: false,  // 是否登录
    requestLoginState: false
};


// getters 获取数据
const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn
    },
    requestLoginState: (state) => {
        return state.requestLoginState
    }
};


// actions 定义监听事件
const actions = {
    /*login: ({commit}, loginInfo) => {
        // 判断是否登录成功
        return auth.login(loginInfo.name, loginInfo.password, (res) => {
            console.log('判断是否登录成功 =>>', res)

            if (res.state == 1) {
                console.log('登录成功')
                 commit(LOGIN_SUCCESS)
            } else if (res.state == 0) {
                console.log('登录失败')
                commit(LOGIN_FAIL)
            }
        })
    },*/
    changeLoginState: ({commit}, loginState) => {
        switch (loginState) {
            case 'success':
                commit(LOGIN_SUCCESS)
                break;
            case 'fail':
                commit(LOGIN_FAIL)
        }
    },
    logout: ({commit}) => {
        commit(LOGIN_OUT)
    },
    checkLoggedIn: ({commit}) => {
        commit(CHECK_LOGGED_IN)
    }
};


// mutations 接受由 actions commit 过来的事件, 处理 state 状态数据
const mutations = {
    [LOGIN_FAIL](state) {
        state.requestLoginState = false
    },
    [LOGIN_SUCCESS](state) {
        state.requestLoginState = true
        state.isLoggedIn = true
    },
    [CHECK_LOGGED_IN](state) {
        state.isLoggedIn = auth.loggedIn()
    },
    [LOGIN_OUT](state) {
        auth.logout()
        state.isLoggedIn = false
        state.requestLoginState =false
    }
};


// 导出
export default {
    state,
    getters,
    actions,
    mutations
}
