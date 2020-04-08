<template>
    <div class="columns">
        <div class="column is-full">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Create New Journal Entry
                    </p>
                </header>

                <div class="card-content">
                    <div class="content">
                        <beer-journal-form :beer="beer" :styles="state.styles"></beer-journal-form>
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
                beer: {
                    style: null,
                    primary_fermentation_start: window.Moment.tz('America/New_York').format('d/m/YYYY H:i')
                }
            };
        },
        props: ['state'],
    };
</script>