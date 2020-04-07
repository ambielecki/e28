<template>
    <div>
        <h1>Create Placeholder</h1>
        <beer-journal-form :test="'Create Test'"></beer-journal-form>
    </div>
</template>

<script>
    import BeerJournalForm from "./BeerJournalForm";
    export default {
        components: { BeerJournalForm },
        data: function () {
            return {};
        }
    };
</script>