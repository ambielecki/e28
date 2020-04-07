import './../node_modules/bulma/css/bulma.css';

import Beer from './Beer';
import Vue from 'vue'
import VueRouter from 'vue-router'

// components
import App from './App.vue'
import BeerHome from './assets/components/BeerHome';
import BeerTools from './assets/components/BeerTools';
import BeerLogList from './assets/components/log/BeerLogList';
import BeerLogCreate from './assets/components/log/BeerLogCreate';
import BeerLogView from './assets/components/log/BeerLogView';
import BeerLogEdit from './assets/components/log/BeerLogEdit';

window.Axios = require('axios').default.create({
    baseURL: process.env.VUE_APP_API_URL,
});

Vue.use(VueRouter);

const routes = [
    { path: '/log/create', name: 'log-create', component: BeerLogCreate },
    { path: '/log/:id', name: 'log-view', component: BeerLogView },
    { path: '/log/edit/:id', name: 'log-edit', component: BeerLogEdit },
    { path: '/log', name: 'log', component: BeerLogList },
    { path: '/tools', name: 'tools', component: BeerTools },
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
    mounted: function () {
        Beer.initializeNavbar();
    }
}).$mount('#app');
