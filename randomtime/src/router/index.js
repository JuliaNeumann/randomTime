import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import WeekPlan from '@/components/WeekPlan';
import DayPlan from '@/components/DayPlan';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/weekplan',
      name: 'WeekPlan',
      component: WeekPlan,
    },
    {
      path: '/dayplan',
      name: 'DayPlan',
      component: DayPlan,
    },
  ],
});
