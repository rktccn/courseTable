import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'Home',
        path: '/home',
        component: () => import('../views/Home.vue')
    },
    {
        name: 'Setting',
        path: '/setting',
        component: () => import('../views/Setting.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
