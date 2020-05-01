import './../node_modules/bulma/bulma.sass';

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate';
import BeerApiPlugin from "./common/BeerApiPlugin";

// components
import App from './App.vue'
import BeerHome from './assets/components/BeerHome';
import BeerTools from './assets/components/tools/BeerTools';
import BeerJournalList from './assets/components/journal/BeerJournalList';
import BeerJournalCreate from './assets/components/journal/BeerJournalCreate';
import BeerJournalView from './assets/components/journal/BeerJournalView';
import BeerJournalEdit from './assets/components/journal/BeerJournalEdit';
import BeerLogin from "./assets/components/auth/BeerLogin";
import BeerRegister from "./assets/components/auth/BeerRegister";
import BeerUpdatePassword from "./assets/components/auth/BeerUpdatePassword";

import store from '@/common/store';

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

import moment from 'moment-timezone';
Vue.prototype.$moment = moment;

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
    return moment.tz(value, 'America/New_York').format('YYYY-MM-DD');
});

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(BeerApiPlugin);

const routes = [
    { path: '/journal/edit/:id', name: 'journal-edit', component: BeerJournalEdit },
    { path: '/journal/create', name: 'journal-create', component: BeerJournalCreate },
    { path: '/journal/:id', name: 'journal-view', component: BeerJournalView },
    { path: '/journal', name: 'journal', component: BeerJournalList },
    { path: '/tools', name: 'tools', component: BeerTools },
    { path: '/login', name: 'login', component: BeerLogin },
    { path:'/register', name: 'register', component: BeerRegister },
    { path: '/password', name: 'password', component: BeerUpdatePassword },
    { path: '/', name: 'home', component: BeerHome },
];

const only_logged_in = [
    'password',
];

const only_guests = [
    'register',
    'login',
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    // restrict the journal group to logged in users
    if ((to.name.includes('journal') || only_logged_in.includes(to.name)) && !store.getters.getLoggedIn() && !checkCachedTokenValidity()) {
        store.commit('addMessage', {
            time: 5,
            type: 'is-danger',
            message: 'You Must Be Logged In to View this Page',
        });

        next({ name: 'login' });
    } else if (only_guests.includes(to.name) && (checkCachedTokenValidity() || store.getters.getLoggedIn())) {
        // keep logged in users out of guest pages
        store.commit('addMessage', {
            time: 5,
            type: 'is-warning',
            message: 'Already Logged In',
        });

        next({ name: 'home' });
    } else {
        next();
    }
});

Vue.mixin({
    methods: {
        handleErrors(error) {
            let messages = [];

            // just want to make sure everything is defined
            if (Object.prototype.hasOwnProperty.call(error, 'response')) {
                if (Object.prototype.hasOwnProperty.call(error.response.data, 'data')) {
                    // where api validation errors are placed
                    if (Object.prototype.hasOwnProperty.call(error.response.data.data, 'errors')) {
                        for (let error_group in error.response.data.data.errors) {
                            error.response.data.data.errors[error_group].forEach(message => {
                                messages.push(error_group + ': ' + message);
                            });
                        }
                    }
                }

                // add the default message if there were no error messages
                if (messages.length === 0) {
                    if (Object.prototype.hasOwnProperty.call(error.response.data, 'message')) {
                        messages.push(error.response.data.message);
                    }
                }
            }

            messages.forEach(error_message => {
                this.$store.commit('addMessage', {
                    time: 5,
                    type: 'is-danger',
                    message: error_message,
                });
            });
        },
    }
});

new Vue({
    router: router,
    store: store,
    render: h => h(App),
    data: {},
    created: function () {
        this.getStyles();
        this.checkedCachedToken();
    },
    mounted: function () {
        this.initNavbar();
        this.$beerApi.initHeartbeat();
    },
    methods: {
        getStyles: async function () {
            try {
                this.$store.state.styles = await this.$beerApi.getStyles();
            } catch (error) {
                let error_messages = this.formatErrorMessages(error);

                error_messages.forEach(error_message => {
                    this.$store.commit('addMessage', {
                        time: 5,
                        type: 'is-danger',
                        message: error_message,
                    });
                });
            }
        },

        // get stored tokens from local storage and reuse for page reloading
        checkedCachedToken: function () {
            let expiration = window.localStorage.getItem('token_expiration');
            let token = window.localStorage.getItem('token');
            if (expiration) {
                if (moment.tz('America/New_York').isBefore(expiration)) {
                    this.$beerApi.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                    this.$store.commit('setLogin', true);
                }
            }
        },

        initNavbar: function () {
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {

                // Add a click event on each of them
                $navbarBurgers.forEach(el => {
                    el.addEventListener('click', () => {

                        // Get the target from the "data-target" attribute
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);

                        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                    });
                });
            }
        }
    },
}).$mount('#app');

/*
 for route guards, this works if someone navigates by typing a link and using the cached login (this is not set
 through the store yet).  Should probably combine with the method being used to set the token, but then I'd be checking
 localStorage twice without some funky return here
 */
function checkCachedTokenValidity() {
    let has_valid_token = false;

    let expiration = window.localStorage.getItem('token_expiration');
    let token = window.localStorage.getItem('token');

    if (expiration && token) {
        has_valid_token = moment.tz('America/New_York').isBefore(expiration);
    }

    return has_valid_token
}