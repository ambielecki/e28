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

        <beer-flash-message :state="state"></beer-flash-message>

        <br>

        <div class="container">
            <router-view :state="state"></router-view>
        </div>
    </div>
</template>

<script>
    import BeerFlashMessage from "./assets/components/helpers/BeerFlashMessage";

    export default {
        name: 'App',
        components: { BeerFlashMessage },
        data: function () {
            return {
                state: {
                    styles: {},
                    success_messages: [
                        { message: 'You were successful', time: 5 },
                        { message: 'Also Success', time: 10 },
                    ],
                },

            };
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
            // Clear messages after set interval
            window.setInterval(() => {
                this.state.success_messages.map(function (message) {
                    message.time--;

                    return message
                });

                this.state.success_messages = this.state.success_messages.filter(function (message) {
                    return message.time > 0;
                });
            }, 1000);
        },
    }
</script>

<style>
    @import './assets/scss/beer.scss';
</style>
