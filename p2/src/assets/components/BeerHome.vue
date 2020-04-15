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
                    Welcome to A Simple Homebrew Journal
                </p>
                <div v-html="content" v-cloak></div>
            </div>
        </div>
    </div>
</template>

<script>
    const Beer = require('../../Beer').default;
    let beer = new Beer;

    export default {
        data: function () {
            return {
                content: '',
            };
        },
        mounted: function () {
            window.Axios.get('/beer/home')
                .then(response => {
                    if (beer.validateResponse(response, 'page')) {
                        if (Object.prototype.hasOwnProperty.call(response.data.data.page, 'content')) {
                            this.content = response.data.data.page.content;
                        }
                    } else {
                        this.content = 'There was a problem loading the home page, please try again.'
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
        }
    };
</script>

<style>
    figure.image {
        margin: 0 0 1rem 0;
    }
</style>
