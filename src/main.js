import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/utils/axios.js'
import store from '@/store/index.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router, store, axios,
  render: h => h(App),
}).$mount('#app')
