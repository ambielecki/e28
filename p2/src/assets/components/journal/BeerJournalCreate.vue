<template>
    <div class="columns">
        <div class="col is-full">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Create New Journal Entry
                    </p>
                </header>

                <div class="card-content">
                    <div class="content">
                        <beer-journal-form></beer-journal-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BeerJournalForm from "./BeerJournalForm";
    export default {
        components: { BeerJournalForm },
        data: function () {
            return {

            };
        }
    };
</script>