import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: null,
        avatar: null,
        mobile: null,
        token: null,
        remark: null,
        auth: false,
    },
    mutations: {
        // 用户登录成功，存储 token 并设置 header 头
        logined(state, token) {
            state.auth = true
            state.token = token
            localStorage.token = token
        },
        // 用户刷新 token 成功，使用新的 token 替换掉本地的token
        refreshToken(state, token) {
            state.token = token
            localStorage.token = token
            axios.defaults.headers.common['Authorization'] = state.token
        },
        // 登录成功后拉取用户的信息存储到本地
        profile(state, data) {
            state.name = data.name
            state.email = data.email
        },
        // 用户登出，清除本地数据
        logout(state){
            state.name = null
            state.mobile = null
            state.avatar = null
            state.remark = null
            state.auth = false
            state.token = null

            localStorage.removeItem('token')
        }
    },
    actions: {
        // 登录成功后保存用户信息
        logined({dispatch,commit}, token) {
            return new Promise(function (resolve, reject) {
                commit('logined', token)
                axios.defaults.headers.common['Authorization'] = token
                localStorage.setItem('token',token)
                dispatch('profile').then(() => {
                    resolve()
                    location.href = '/';
                }).catch(() => {
                    reject()
                })
            })
        },
        // 登录成功后使用 token 拉取用户的信息
        profile({commit}) {
            return new Promise(function (resolve, reject) {
                axios.get('http://122.152.231.165/api/getAuthenticatedUser', {}).then(respond => {
                    if (respond.status == 200) {
                        commit('profile', respond.data)
                        resolve()
                    } else {
                        reject()
                    }
                })
                location.href = '/';
            })
        },
        // 用户登出，清除本地数据并重定向至登录页面
        logout({commit}) {
            return new Promise(function (resolve, reject) {
                commit('logout')
                location.href = 'auth/login';
            })
        },
        // 将刷新的 token 保存至本地
        refreshToken({commit},token) {
            return new Promise(function (resolve, reject) {
                commit('refreshToken', token)
            })
        },
    }
})
