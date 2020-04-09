<template>
    <h1>Log List Placeholder</h1>
</template>

<script>
    export default {
        data: function () {
            return {
                beers: [],
            };
        },
        mounted: function () {
            this.getBeers();
        },
        methods: {
            getBeers(page = 1) {
                window.Axios.get('/beer', {
                    params: {
                        page: page
                    },
                })
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    };
</script>