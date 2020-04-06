<template>
    <div>
        <h1>Create Placeholder</h1>
        <beer-log-form :test="'Create Test'"></beer-log-form>
    </div>
</template>

<script>
    import BeerLogForm from "./BeerLogForm";
    export default {
        components: { BeerLogForm },
        data: function () {
            return {};
        }
    };
</script>