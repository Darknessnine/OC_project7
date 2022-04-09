import { createRouter, createWebHashHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import ForumView from '../views/ForumView.vue'
import ProfileView from '../views/ProfileView.vue'
import LogoutView from '../views/LogoutView.vue'
import PostView from '../views/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView
  },

  {
    path: '/post',
    name: 'post',
    component: PostView
  },










]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
