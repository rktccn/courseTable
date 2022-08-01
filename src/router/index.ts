import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        meta: { index: 1 }
    },
    {
        name: 'Home',
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: { index: 1 }
    },
    {
        name: 'Setting',
        path: '/setting',
        component: () => import('../views/Setting.vue'),
        meta: { index: 2 }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach((to, from) => {
    const toDepth = to.meta.index || 0
    const fromDepth = from.meta.index || 0
    to.meta.transitionName = toDepth < fromDepth ? 'zoom-out' : 'zoom-in'
})

export default router
