import {
    TOGGLE_SIDE_NAV,
    HIDE_SIDE_NAV,
    GET_THEMES_LIST,
}
from '../constants.js'

import request from '../../api/request'

// state 定义初始化数据
const state = {
    open: false,
    themesList: [],
    others: [],
    subscribed: [],
};


// getters 获取数据
const getters = {
    isOpen: (state) => {
        return state.open
    },
    themesList: (state) => {
        return state.themesList
    }
};


// actions 定义监听事件
const actions = {
    toggleSideNav: ({commit}) => {
        commit(TOGGLE_SIDE_NAV);
    },
    hideSideNav: ({commit}) => {
        commit(HIDE_SIDE_NAV);
    },
    getThemesList: ({commit}) => {
        commit(GET_THEMES_LIST);
    }
};


// mutations 接受由 actions commit 过来的事件, 处理 state 状态数据
const mutations = {
    [TOGGLE_SIDE_NAV](state) {
        state.open = !state.open
    },
    [HIDE_SIDE_NAV](state) {
        state.open = false
    },
    [GET_THEMES_LIST](state) {
        request.getThemes((res) => {
            res.subscribed.forEach((item, index) => {
                let subscribedItem = {
                    id: item.id,
                    name: item.name,
                    subscribed: 1
                }

                state.subscribed.push(subscribedItem)
            })

            res.others.forEach((item, index) => {
                let otherItem = {
                    id: item.id,
                    name: item.name,
                    subscribed: 0
                }

                state.others.push(otherItem)
            })

            state.themesList = state.subscribed.concat(state.others)
        }, (err) => {
            console.log(err)
        })
    }
};


// 导出
export default {
    state,
    getters,
    actions,
    mutations
}
