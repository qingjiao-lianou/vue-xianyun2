import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    // 存储仓库数据
    state: {
        // 先从浏览器获取数据
        userInfo: JSON.parse(localStorage.getItem('user')) || {}
    },

    // 修改仓库数据
    mutations: {
        setUserInfo(state, data) {
            // 把传过来的数据保存到浏览器中
            localStorage.setItem('user', JSON.stringify(data))
            state.userInfo = data;  //更新state数据
        },


    }
})