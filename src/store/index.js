import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    // 存储仓库数据
    state: {
        userInfo: {}
    },

    // 修改仓库数据
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
        }
    }
})