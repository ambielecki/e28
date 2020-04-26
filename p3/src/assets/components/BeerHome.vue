<template>
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img src="../../assets/images/Beer_banner.jpg" alt="A view of brewing ingredients">
            </figure>
        </div>

        <div class="card-content">
            <div class="content">
                <p class="title">
                    Welcome to Homebrew Helper
                </p>
                <div v-html="content" v-cloak></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                content: '',
            };
        },
        mounted: function () {
            this.getHome();
        },
        methods: {
            getHome: async function () {
                if (this.$store.state.home_content !== '') {
                    this.content = this.$store.state.home_content;
                } else {
                    try {
                        this.content = await this.$beerApi.getHome();
                        this.$store.commit('cacheHomeContent', this.content);
                    } catch (error) {
                        this.handleErrors(error);
                    }
                }
            },
        },
    };
</script>

<style>
    figure.image {
        margin: 0 0 1rem 0;
    }
</style>
