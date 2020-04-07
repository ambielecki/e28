<template>
    <h1>Home Placeholder</h1>
</template>

<script>
    export default {
        data: function () {
            return {};
        },

        mounted: function () {
            window.Axios.get('health-check')
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
</script>
