<template>
    <div id="app">
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" exact class="navbar-item" data-test="logo">
                    <img alt="Beer Mug Logo" src="./assets/images/logo.png" width="21" height="30">
                </router-link>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="beer_navbar">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="beer_navbar" class="navbar-menu">
                <div class="navbar-start">
                    <router-link :to="{ name: 'home' }" class="navbar-item" data-test="nav-home">Home</router-link>
                    <router-link v-if="logged_in" :to="{ name: 'journal' }" class="navbar-item" data-test="nav-journal">Journal</router-link>
                    <span
                        v-else
                        class="navbar-item disabled_link"
                        title="Please Login Or Register To View Journal"
                    >
                        Journal
                    </span>
                    <router-link :to="{ name: 'tools' }" class="navbar-item" data-test="nav-tools">Tools</router-link>
                </div>

                <div class="navbar-end">
                    <template v-if="!logged_in">
                        <router-link :to="{ name: 'login' }" class="navbar-item" data-test="nav-login">Log In</router-link>
                        <router-link :to="{ name: 'register' }" class="navbar-item" data-test="nav-register">Register</router-link>
                    </template>

                    <template v-else>
                        <router-link v-if="logged_in" :to="{ name: 'password' }" class="navbar-item" data-test="nav-password">Update Password</router-link>
                        <div class="buttons" v-if="logged_in">
                            <button class="button is-link" @click="logOut" data-test="nav-logout">Log Out</button>
                        </div>
                    </template>
                </div>
            </div>
        </nav>

        <beer-flash-message></beer-flash-message>

        <br>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    /**
     * @typedef {Object} FlashMessage
     * @property {number} time - expiration in seconds
     * @property {string} type - class, is-danger, is-success
     * @property {string} message - message to be displayed
     */

    import BeerFlashMessage from "./assets/components/helpers/BeerFlashMessage";

    export default {
        name: 'App',
        components: { BeerFlashMessage },
        data: function () {
            return {};
        },
        computed: {
            logged_in: function () {
                return this.$store.state.logged_in;
            },
        },
        created: function () {
            // every second decrement time by 1 and remove messages that have timed out
            window.setInterval(() => {
                if (this.$store.state.messages.length > 0) {
                    this.$store.commit('decrementMessageTimes');
                    this.$store.commit('removeExpiredMessages');
                }
            }, 1000);
        },
        methods: {
            logOut: async function () {
                try {
                    let logged_out = await this.$beerApi.logout();

                    if (logged_out) {
                        this.$store.commit('setLogin', false);
                        this.$beerApi.clearAuthHeader();
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-success',
                            message: 'Successfully logged out, come back soon.',
                        });

                        if (this.$route.path !== '/') {
                            this.$router.push('/');
                        }
                    }
                } catch (error) {
                    this.handleErrors(error);
                }
            }
        },
    }
</script>

<style>
    @import './assets/scss/beer.scss';

    .disabled_link {
        opacity: .65;
    }
</style>
