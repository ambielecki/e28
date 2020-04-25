<template>
    <div class="columns">
        <div class="column is-full">
            <div v-if="is_loading" class="column is-full">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-full">
                                    <progress class="progress is-large is-info" max="100"></progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Editing: {{ beer.name }}
                    </p>
                </header>

                <div class="card-content">
                    <div class="content">
                        <beer-journal-form :beer="beer"></beer-journal-form>
                        <div class="columns">
                            <div class="column is-full">
                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" @click="submit">Edit Beer</button>
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

    export default {
        components: { BeerJournalForm },
        data: function () {
            return {
                beer: {},
                is_loading: true,
            };
        },
        props: ['state'],
        methods: {
            submit: function () {
                window.Axios.put('/beer/' + this.beer.id, this.beer)
                    .then(response => {
                        if (this.validateResponse(response, 'beer')) {
                            this.$store.commit('addMessage', {
                                time: 5,
                                type: 'is-success',
                                message: 'Beer updated successfully',
                            });

                            this.$router.push({
                                name:'journal-view',
                                params: {
                                    id: this.beer.id
                                }
                            });
                        }
                    })
                    .catch(error => {
                        let error_messages = this.formatErrorMessages(error);
                        error_messages.forEach(error_message => {
                            this.$store.commit('addMessage', {
                                time: 5,
                                type: 'is-danger',
                                message: error_message,
                            });
                        });
                    });
            },

            cancel: function () {
                this.$router.push({
                    name: 'journal-view',
                    params: {
                        id: this.beer.id,
                    },
                })
            }
        },
        mounted: function () {
            window.Axios.get('/beer/' + this.$route.params.id, {})
                .then(response => {
                    if (this.validateResponse(response, 'beer')) {
                        this.beer = response.data.data.beer;
                    } else {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-danger',
                            message: 'There was a problem loading this entry',
                        });
                    }
                })
                .catch(error => {
                    let error_messages = this.formatErrorMessages(error);
                    error_messages.forEach(error_message => {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-danger',
                            message: error_message,
                        });
                    });
                })
                .then(() => {
                    this.is_loading = false;
                });
        }
    };
</script>