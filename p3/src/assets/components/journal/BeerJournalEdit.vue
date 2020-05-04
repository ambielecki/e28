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
                        <beer-journal-form :beer="beer" ref="beerJournalForm"></beer-journal-form>
                        <div class="columns">
                            <div class="column is-full">
                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" @click="submit" data-test="form-edit">Edit Beer</button>
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
        methods: {
            submit: async function () {
                try {
                    if (!this.$refs.beerJournalForm.validate()) {
                        return
                    }

                    let response_beer = await this.$beerApi.putBeer(this.beer.id, this.beer);

                    if (response_beer) {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-success',
                            message: 'Beer updated successfully',
                        });

                        this.$store.commit('cacheBeer', response_beer);

                        this.$router.push({
                            name:'journal-view',
                            params: {
                                id: this.beer.id
                            }
                        });
                    }
                } catch (error) {
                    this.handleErrors(error);
                }
            },

            cancel: function () {
                this.$router.push({
                    name: 'journal-view',
                    params: {
                        id: this.beer.id,
                    },
                })
            },

            getBeer: async function (id) {
                if (this.$store.getters.checkCachedBeer(id)) {
                    this.beer = this.$store.getters.getCachedBeer(id);
                } else {
                    try {
                        this.beer = await this.$beerApi.getBeer(id);
                        this.$store.commit('cacheBeer', this.beer);
                    } catch (error) {
                        this.handleErrors(error);
                    }
                }

                this.is_loading = false;
            },
        },
        mounted: function () {
            this.getBeer(this.$route.params.id);
        }
    };
</script>