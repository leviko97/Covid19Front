import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import {useAuthStore} from "@/stores/auth";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: to => {
        return {path: '/ge/login'}
      }
    },
    {
      path: '/:lang',
      name: 'lang',
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
      ]
    },
  ]
})

router.beforeEach((to) => {
  if (!to.params.lang)
    return '/ka'

  if (to.meta.requiresAuth && !localStorage.getItem('token'))
    return `/${to.params.lang}/login`

  if (!to.meta.requiresAuth && localStorage.getItem('token'))
    return `/${to.params.lang}`
})

export default router
