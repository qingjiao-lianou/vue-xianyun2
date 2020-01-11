import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    // 存储仓库数据
    state: {
        // 先从浏览器获取数据
        userInfo: JSON.parse(localStorage.getItem('user')) || {}, //用户数据
        // 机票信息
        airInfo: {
            seat_infos: {}
        },
        // 价格
        allPrice:0
    },

    // 修改仓库数据
    mutations: {
        // 设置用户数据
        setUserInfo(state, data) {
            // 把传过来的数据保存到浏览器中
            localStorage.setItem('user', JSON.stringify(data))
            state.userInfo = data;  //更新state数据
        },
        //  设置信息数据
        setAirInfo(state, data) {
            state.airInfo = data
        },
        // 设置总价
        setAllPrice(state,price){
            state.allPrice = price
        }
    }
})