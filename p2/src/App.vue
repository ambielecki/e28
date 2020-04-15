<template>
    <div id="app">
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" exact class="navbar-item">
                    <img src="./assets/images/logo.png" width="21" height="30">
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
                    <router-link :to="{ name: 'home' }" class="navbar-item">Home</router-link>
                    <router-link :to="{ name: 'journal' }" class="navbar-item">Journal</router-link>
                    <router-link :to="{ name: 'tools' }" class="navbar-item">Tools</router-link>
                </div>
            </div>
        </nav>

        <beer-flash-message
            :state="state"
            @remove-message="removeMessage"
        ></beer-flash-message>

        <br>

        <div class="container">
            <router-view
                :state="state"
                @set-message="setMessage"
            ></router-view>
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
    const Beer = require('./Beer').default;
    let beer = new Beer();

    export default {
        name: 'App',
        components: { BeerFlashMessage },
        data: function () {
            return {
                state: {
                    styles: {},
                    messages: [
                        // { time: 5, type: 'is-success', message: 'Success!' },
                        // { time: 5, type: 'is-danger', message: 'Danger Will Robinson!' },
                    ], // object { time: int, message: 'string', type: 'string (is-success, is-danger)' }
                    logged_in: false,
                },

            };
        },
        methods: {
            /**
             * @param {FlashMessage} message
             */
            setMessage(message) {
                this.state.messages.push(message);
            },
            removeMessage(key) {
                this.state.messages.splice(key, 1);
            },
        },
        mounted: function () {
            window.Axios.get('/beer/styles')
                .then(response => {
                    this.$data.state.styles = response.data.data.styles;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        created: function () {
            // log in the test user and set axios headers
            beer.testLogin()
                .then(response => {
                    if (beer.validateResponse(response, 'access_token')) {
                        this.state.logged_in = true;
                    }
                })
                .catch(error => {
                    let error_messages = beer.formatErrorMessages(error);

                    error_messages.forEach(error_message => {
                        this.$emit('set-message', {
                            time: 5,
                            type: 'is-danger',
                            message: error_message,
                        });
                    });
                });

            // every second decrement time by 1 and remove messages that have timed out
            window.setInterval(() => {
                this.state.messages.map(function (message) {
                    message.time--;

                    return message;
                });

                this.state.messages = this.state.messages.filter(function (message) {
                    return message.time > 0;
                });
            }, 1000);
        },
    }
</script>

<style>
    @import './assets/scss/beer.scss';
</style>
