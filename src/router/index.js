/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Topic from '../views/Topic.vue';
import Register from '../views/Register.vue';
import Achievements from '../views/Achievements.vue';
import Trivia from '../views/Trivia.vue';

import VueSpeech from 'vue-speech';
import VueTextToSpeech from 'vue-text-to-speech';

Vue.use(VueSpeech);
Vue.use(VueRouter);
Vue.use(VueTextToSpeech);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: Achievements,
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    component: Topic,
  },
  {
    path: '/trivia/:id',
    name: 'Trivia',
    component: Trivia,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = !!localStorage.getItem('auth');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) next({ name: 'Login' });
    else next();
  } else next();

  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
  // else next();
});

export default router;
