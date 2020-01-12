import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Air from '@/views/air/index.vue'
import Hotel from '@/views/hotel/index.vue'
import Post from '@/views/post/index.vue'
import Login from '@/views/user/login.vue'
import Flights from '@/views/air/flights.vue'
import Order from '@/views/air/order.vue'
import Pay from '@/views/air/pay.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'air',
            path: '/air',
            component: Air,
        },
        {
            name: 'hotel',
            path: '/hotel',
            component: Hotel
        },
        {
            name: 'post',
            path: '/post',
            component: Post
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'flights',
            path: '/air/flights',
            component: Flights
        },
        {
            name: 'order',
            path: '/air/order',
            component:Order
        },
        {
            name: 'pay',
            path: '/air/pay',
            component:Pay
        },
    ]
})