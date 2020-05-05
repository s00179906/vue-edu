/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Topic from '../views/Topic.vue';

import VueSpeech from 'vue-speech';
import VueTextToSpeech from 'vue-text-to-speech';

Vue.use(VueSpeech);
Vue.use(VueRouter);
Vue.use(VueTextToSpeech);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: guardMyroute,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: Topic,
    beforeEnter: guardMyroute,
  },
];

const isAuthenticated = !!localStorage.getItem('auth');

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

function guardMyroute(to, from, next) {
  let isAuthenticated = !!localStorage.getItem('auth');
  isAuthenticated ? next() : next('/login');
}

export default router;
