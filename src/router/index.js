import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../views/Index.vue'),
        children: [
            {
                name: 'index',
                path: 'index',
                alias: '/',
                component: () => import('../views/Article.vue')
            },
            {
                name: 'games',
                path: 'games',
                component: () => import('../views/Games.vue')
            },
            {
                name: 'user',
                path: 'user',
                component: () => import('../views/Personal.vue')
            }
        ]
    },
    {
        path: '/gameDetail/:id',
        name: 'detail',
        component: () => import('../views/GameDetail.vue')
    },
    {
        path: '/articleDetail/:id',
        name: 'articleDetail',
        component: () => import('../views/ArticleDetail.vue')
    },
    {
        path: '/order/:id',
        name: 'order',
        component: () => import('../views/Order.vue')
    },
    {
        path: '/moreGame',
        name: 'more',
        component: () => import('../views/MoreGame.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }


]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


