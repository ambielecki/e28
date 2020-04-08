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
                        <div class="columns">
                            <div class="column is-full">
                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" @click="submit">Add Entry</button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" @click="cancel">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    primary_fermentation_start: window.Moment.tz('America/New_York').format('YYYY-M-D H:mm'),
                    rating: null,
                },
            };
        },
        props: ['state'],
        methods: {
            submit: function () {
                window.Axios.post('/beer', this.beer)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            },

            cancel: function () {
                this.$router.push({ name: 'journal' })
            }
        },
    };
</script>