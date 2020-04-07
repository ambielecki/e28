import './../node_modules/bulma/css/bulma.css';

import Beer from './Beer';
import Vue from 'vue'
import VueRouter from 'vue-router'

// components
import App from './App.vue'
import BeerHome from './assets/components/BeerHome';
import BeerTools from './assets/components/BeerTools';
import BeerJournalList from './assets/components/journal/BeerJournalList';
import BeerJournalCreate from './assets/components/journal/BeerJournalCreate';
import BeerJournalView from './assets/components/journal/BeerJournalView';
import BeerJournalEdit from './assets/components/journal/BeerJournalEdit';

// want to be able to set local vs prod api
window.Axios = require('axios').default.create({
    baseURL: process.env.VUE_APP_API_URL,
});

Vue.use(VueRouter);

const routes = [
    { path: '/journal/create', name: 'journal-create', component: BeerJournalCreate },
    { path: '/journal/:id', name: 'journal-view', component: BeerJournalView },
    { path: '/journal/edit/:id', name: 'journal-edit', component: BeerJournalEdit },
    { path: '/journal', name: 'journal', component: BeerJournalList },
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
