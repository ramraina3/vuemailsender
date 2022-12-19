import Vue from 'vue'
import VueRouter from 'vue-router'
import Update from '../views/Update.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'General',  
    component: () => import(/* webpackChunkName: "about" */ '../views/General.vue')  
  },
  {
    path: '/update',
    name: 'update',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Update.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
