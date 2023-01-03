import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: BlogView,
      meta: {
        title: "Blogs"
      }
    },
  
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ODBlogss`;
  next()
})

export default router
