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
    import BeerJournalForm from "./parts/BeerJournalForm";
    const Beer = require('../../../common/Beer').default;
    let beer = new Beer();

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
                        if (beer.validateResponse(response, 'beer')) {
                            this.$emit('set-message', {
                                time: 5,
                                type: 'is-success',
                                message: 'Beer created successfully',
                            });

                            this.$store.commit('addMessage', {
                                time: 5,
                                type: 'is-success',
                                message: 'Beer created successfully',
                            });

                            this.$router.push({ name:'journal' });
                        }
                    })
                    .catch(error => {
                        let error_messages = beer.formatErrorMessages(error);
                        error_messages.forEach(error_message => {
                            this.$emit('set-message', {
                                time: 5,
                                type: 'is-danger',
                                message: error_message,
                            });

                            this.$store.commit('addMessage', {
                                time: 5,
                                type: 'is-danger',
                                message: error_message,
                            });
                        });
                    });
            },
            cancel: function () {
                this.$router.push({ name: 'journal' })
            }
        },
    };
</script>