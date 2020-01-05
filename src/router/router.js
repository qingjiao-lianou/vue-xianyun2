import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Air from '@/views/air/index.vue'
import Hotel from '@/views/hotel/index.vue'
import Post from '@/views/post/index.vue'
import User from '@/views/user/index.vue'

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
            component: Air
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
            name: 'user',
            path: '/user',
            component: User
        },
    ]
})