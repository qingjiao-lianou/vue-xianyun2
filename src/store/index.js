import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        userInfo:{
            token:'1111',
            user:{}
        }
    }
})