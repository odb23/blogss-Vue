import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogsView.vue'
import LoginView from "../views/LoginView.vue"
import Registerview from "../views/RegisterView.vue"
import ForgotPasswordView from "../views/ForgotPasswordView.vue"
import ProfileView from "../views/ProfileView.vue"
import AdminView from "../views/AdminView.vue"
import CreatePostView from "../views/CreatePostView.vue"
import BlogPreview from "../views/BlogPreview.vue"

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
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        title: "My Profile"
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      meta: {
        title: "Manage Admins"
      }
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: CreatePostView,
      meta: {
        title: "Create Post"
      }
    },
    {
      path: "/post-preview",
      name: "PostPreview",
      component: BlogPreview,
      meta: {
        title: "Preview Blog Post"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ODBlogss`;
  next()
})

export default router
