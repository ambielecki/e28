import './../node_modules/bulma/bulma.sass';

import Vue from 'vue'
import VueRouter from 'vue-router'

// components
import App from './App.vue'
import BeerHome from './assets/components/BeerHome';
import BeerTools from './assets/components/tools/BeerTools';
import BeerJournalList from './assets/components/journal/BeerJournalList';
import BeerJournalCreate from './assets/components/journal/BeerJournalCreate';
import BeerJournalView from './assets/components/journal/BeerJournalView';
import BeerJournalEdit from './assets/components/journal/BeerJournalEdit';

import store from './common/store';

// want to be able to set local vs prod api
window.Axios = require('axios').default.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
    },
});

// Time and number formats, two things I hate about JS
window.Moment = require('moment-timezone');
window.Accounting = require('accounting');

const Beer = require('./common/Beer').default;
let beer = new Beer();

Vue.filter('truncate', function (value, length) {
    let split_words = value.split(' ');
    let number_of_words = split_words.length;

    let truncated = split_words.splice(0, length).join(' ');

    if (number_of_words > length) {
        truncated = truncated + ' ...';
    }

    return truncated;
});

Vue.filter('date-format', function (value) {
    return window.Moment.tz(value, 'America/New_York').format('YYYY-MM-DD');
});

Vue.use(VueRouter);

const routes = [
    { path: '/journal/edit/:id', name: 'journal-edit', component: BeerJournalEdit },
    { path: '/journal/create', name: 'journal-create', component: BeerJournalCreate },
    { path: '/journal/:id', name: 'journal-view', component: BeerJournalView },
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
    store: store,
    render: h => h(App),
    data: {},
    mounted: function () {
        beer.initializeNavbar();
        beer.initializeHeartbeat();
        console.log(this.$store);
    },
}).$mount('#app');
