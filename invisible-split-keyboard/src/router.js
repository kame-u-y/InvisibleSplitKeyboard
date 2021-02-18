import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import CollectTyping from './views/CollectTyping.vue';
import DisplayTapData from './views/DisplayTapData.vue';
import AwesomeTyping from './views/AwesomeTyping.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/collectTyping',
      name: 'collectTyping',
      component: CollectTyping,
    },
    {
      path: '/displayTapData',
      name: 'displayTapData',
      component: DisplayTapData,
    },
    {
      path: '/awesomeTyping',
      name: 'awesomeTyping',
      component: AwesomeTyping,
    },
  ],
});
