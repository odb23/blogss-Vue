import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogsView.vue'
import LoginView from "../views/LoginView.vue"
import Registerview from "../views/RegisterView.vue"
import ForgotPasswordView from "../views/ForgotPasswordView.vue"

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
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: "Login"
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Registerview,
      meta: {
        title: "Register"
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView,
      meta: {
        title: "Forgot Password"
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ODBlogss`;
  next()
})

export default router
