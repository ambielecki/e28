<template>
    <div>
        <h1>Edit Placeholder</h1>
        <beer-journal-form :test="'Edit Test for ' + id "></beer-journal-form>
    </div>
</template>

<script>
    import BeerJournalForm from "./parts/BeerJournalForm";
    export default {
        components: { BeerJournalForm },
        data: function () {
            return {
                id: this.$route.params.id,
            };
        }
    };
</script>