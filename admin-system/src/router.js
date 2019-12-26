import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'home',
          component: () => import('@/views/Home'),
          children: [
            {
              path: '/',
              component: () => import('@/views/components/HomeMain'),
              name: 'HomeMain'
            },
            {
              path: 'detail',
              component: () => import('@/views/components/HomeDetail'),
              name: 'HomeDetail'
            }
          ],
          meta: { title: 'home' }
        },
        {
          path: 'write',
          name: 'write',
          component: () => import('@/views/Write.vue'),
          meta: { title: 'write' }
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('@/views/Comment.vue'),
          meta: { title: 'comment' }
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('@/views/Me.vue'),
          meta: { title: 'me' }
        }
      ]
    }
  ]
})
