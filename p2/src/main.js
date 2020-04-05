import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './../node_modules/bulma/css/bulma.css';

Vue.use(VueRouter);

const routes = [

];

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
