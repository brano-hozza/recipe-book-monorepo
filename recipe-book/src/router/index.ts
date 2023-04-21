import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
export const ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import('@/views/RecipesView.vue')
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('@/views/ResourcesView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES
})

export default router
