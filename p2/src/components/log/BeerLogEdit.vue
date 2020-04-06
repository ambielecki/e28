<template>
    <div>
        <h1>Edit Placeholder</h1>
        <beer-log-form :test="'Edit Test for ' + id "></beer-log-form>
    </div>
</template>

<script>
    import BeerLogForm from "./BeerLogForm";
    export default {
        components: { BeerLogForm },
        data: function () {
            return {
                id: this.$route.params.id,
            };
        }
    };
</script>