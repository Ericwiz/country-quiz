import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/capital',
      name: 'countryCapital',
      component: () => import('../views/CountryCapitalQuizView.vue')
    },

    {
      path: '/flag',
      name: 'CountryFlag',
      component: () => import('../views/CountryFlagView.vue')
    },
  ]
})

export default router
