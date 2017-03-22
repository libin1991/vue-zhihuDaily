<template>
    <div class="page page-member page-login">
        <nav-bar :isFixed="true" :pageTitle="pageTitle" :goBackAction="true">
            <div class="goback" slot="left" @click="goback">
                <i class="line"></i>
                <i class="line"></i>
                <i class="line"></i>
            </div>
        </nav-bar>

        <div class="login-form">
            <div class="form-cell">
                <input v-model="name" @keyup="changeButtonState" class="form-text" type="text" placeholder="帐号" />
                <span @click="clearEmpty" v-if="name.trim() != ''" class="clear-empty"><i class="iconfont icon-clear-fill"></i></span>
            </div>
            <div class="form-cell">
                <input ref="password" v-model="password" class="form-text" type="password" placeholder="密码" />
                <span @click="changeType" class="change-type"><i class="iconfont icon-eye-close" ref="eye"></i></span>
            </div>
            <div class="form-cell">
                <p class="forget-password">
                    <router-link :to="{name: 'login'}">忘记密码？</router-link>
                </p>
            </div>
            <div class="form-button">
                <button @click="loginAction" ref="loginButton" disabled="disabled" class="button block-button">立即登录</button>
            </div>
        </div>

        <div style="color: #ccc; fon-size: 14px; text-align: center; margin-top: 400px;">
            [1@qq.com, 111]
        </div>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'

import auth from '../../api/auth'
import NavBar from '../../components/NavBar'
import Toast from '../../components/toast/toast'

export default {
    data() {
        return {
            pageTitle: '登录',
            name: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn', 'requestLoginState'])
    },
    components: {
        NavBar
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            // 验证是否已登录
            // 已登录: 跳转到"我的"页; 未登录: 跳转到"登录"页
            if (vm.isLoggedIn) {
                vm.$router.replace({ path: '/my'})
            } else {
                next()
            }
        })
    },
    methods: {
        goback() {
            window.history.go(-1)
        },
        changeType() {
            const $password = this.$refs.password
            const $eye = this.$refs.eye
            const type = $password.getAttribute('type')

            if (type == 'password') {
                $password.setAttribute('type', 'text')
                $eye.className = 'iconfont icon-eye-open'
            } else {
                $password.setAttribute('type', 'password')
                $eye.className = 'iconfont icon-eye-close'
            }

        },
        clearEmpty() {
            this.name = ''

            const $loginButton = this.$refs.loginButton
            $loginButton.setAttribute('disabled', 'disabled')
        },
        changeButtonState() {
            const $loginButton = this.$refs.loginButton

            if (this.name.trim() == '') {
                $loginButton.setAttribute('disabled', 'disabled')
            } else {
                $loginButton.removeAttribute('disabled')
            }
        },
        loginAction() {
            if (this.name.trim() == '') {
                Toast({
                    content: '请输入用户名',
                    duration: 1500
                })
                return
            }
            if (this.password.trim() == '') {
                Toast({
                    content: '请输入密码',
                    duration: 1500
                })
                return
            }

            const loginToast = Toast({
                content: '正在登录',
                icon: 'loading',
                duration: 0
            })

            auth.login(this.name, this.password, (res) => {
                console.log('登录结果', res.state, res)

                if (res.state == 1) {
                    // 登录成功
                    this.$store.dispatch('changeLoginState', 'success')

                    loginToast.update({
                        content: '登录成功',
                        icon: 'success',
                        duration: 1500,
                        onCloseCallback: () => {
                            // 重新初始化页面 data
                            Object.assign(this.$data, this.$options.data())
                            this.$refs.loginButton.setAttribute('disabled', 'disabled')

                            console.log('跳转到首页 or redire')
                            this.$router.replace(this.$route.query.redirect || '/')
                        }
                    })
                } else if (res.state == 0) {
                    // 登录失败
                    this.$store.dispatch('changeLoginState', 'fail')

                    loginToast.update({
                        content: '登录失败, 请重试',
                        icon: 'offline',
                        duration: 1500
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../style/index";

.page-member {
    padding: px2rem(40px);
    min-height: calc(100vh - 1rem);
    background-color: #fff;
}
.form-cell {
    position: relative;

    span {
        position: absolute;
        right: 0;
        top: 50%;
        display: inline-block;
        line-height: 1;
        transform: translateY(-50%);
    }

    .clear-empty {
        padding: 0 px2rem(16px);
        color: #999;
        font-size: px2rem(36px);
    }
    .change-type {
        padding: 0 px2rem(10px);
        color: #999;
        font-size: px2rem(50px);
    }

}
.form-button {
    margin-top: px2rem(50px);
}
.form-text {
    border: none;
    width: 100%;
    padding: px2rem(30px) px2rem(0px);
    font-size: px2rem(32px);
    border-bottom: 1px solid #ccc;
}
.forget-password {
    text-align: right;

    a {
        color: #999;
        font-size: px2rem(28px);
    }
}
</style>