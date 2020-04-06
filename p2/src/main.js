import Vue from 'vue'
import VueRouter from 'vue-router'
import './../node_modules/bulma/css/bulma.css';
import App from './App.vue'
import BeerHome from './components/BeerHome';
import BeerTools from './components/BeerTools';
import BeerLogList from './components/log/BeerLogList';
import BeerLogCreate from './components/log/BeerLogCreate';
import BeerLogView from './components/log/BeerLogView';
import BeerLogEdit from './components/log/BeerLogEdit';

Vue.use(VueRouter);

const routes = [
    { path: '/tools', name: 'tools', component: BeerTools },
    { path: '/log/create', name: 'log-create', component: BeerLogCreate },
    { path: '/log/:id', name: 'log-view', component: BeerLogView },
    { path: '/log/edit/:id', name: 'log-edit', component: BeerLogEdit },
    { path: '/log', name: 'log', component: BeerLogList },
    { path: '/', name: 'home', component: BeerHome },
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
