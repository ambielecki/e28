<template>
    <div>
        <h1>Log View Placeholder</h1>
        <h2>View for Beer #{{ id }}</h2>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                id: this.$route.params.id,
            };
        }
    };
</script>