import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import store from '@/store/index.js'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:1337';
// 绑定到原型
Vue.prototype.$axios = axios

Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app')
