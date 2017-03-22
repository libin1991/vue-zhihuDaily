/**
 * Created by 方雨 on 2017/3/12.
 */

import session from '../utils/session'

export default {
    // 登录
    login (user, pass, callback) {
        if (!!session.get('token')) {
            callback && callback({
                state: 1
            })
            return
        }

        // 模拟发送请求
        pretendRequest(user, pass, (res) => {
            if (res.authenticated) {
                session.set('token', res.token)
                callback && callback({
                    state: 1,
                    msg: '登录成功'
                })
            } else {
                callback && callback({
                    state: 0,
                    msg: '登录失败'
                })
            }
        })
    },

    // 判断是否登录
    loggedIn () {
        return !!session.get('token')
    },

    // 退出登录
    logout() {
        return session.remove('token')
    },
}



function pretendRequest (user, pass, callback) {
    setTimeout(() => {
        if (user === '1@qq.com' && pass === '111') {
            callback({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            })
        } else {
            callback({ authenticated: false })
        }
    }, 5000)
}