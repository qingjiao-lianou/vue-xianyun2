import axios from 'axios';
import Vue from 'vue';
import { Message } from 'element-ui'

// 配置基准路径
axios.defaults.baseURL = 'http://localhost:1337';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    // console.log(error.response);
    const { statusCode, message } = error.response.data
    if (statusCode === 400) {
        Message.error(message)
    }

    return Promise.reject(error);
});

// 绑定到原型
Vue.prototype.$axios = axios