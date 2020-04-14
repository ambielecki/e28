<template>
    <div class="columns is-multiline">
        <div class="column is-full">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Brewing Journal</p>
                </header>

                <div class="card-content">
                    <div class="content">
                        <div class="columns">
                            <div class="column is-full" v-if="is_initial_load">
                                <progress  class="progress is-large is-info" max="100"></progress>

                            </div>
                            <div v-else class="column is-full">
                                <p>Filters will go here</p>
                                <div class="buttons">
                                    <button
                                        class="button is-link"
                                        @click="$router.push({ name: 'journal-create' })"
                                    >
                                        Add New Entry
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template v-for="(beer, key) in beers">
            <beer-journal-view-compressed
                v-if="!beer.is_expanded"
                :beer="beer"
                :state="state"
                :key="key"
                @expand-beer="beer.is_expanded = true"
            ></beer-journal-view-compressed>
            <beer-journal-view-expanded
                v-else
                :beer="beer"
                :state="state"
                :key="key"
                :show_collapse="true"
                @collapse-beer="beer.is_expanded = false"
            ></beer-journal-view-expanded>
        </template>

        <div v-if="load_more" class="column is-full">
            <div class="buttons is-centered">
                <button class="button is-link" :class="{ 'is-loading': is_loading }" @click="getBeers(page + 1)">Load More Beer!</button>
            </div>
        </div>
    </div>
</template>

<script>
    import BeerJournalViewCompressed from "./parts/BeerJournalViewCompressed";
    import BeerJournalViewExpanded from "./parts/BeerJournalViewExpanded";

    const Beer = require('../../../Beer').default;
    let beer = new Beer;

    export default {
        components: {BeerJournalViewExpanded, BeerJournalViewCompressed },
        data: function () {
            return {
                beers: [],
                page: 0,
                count: 0,
                limit: 5,
                is_loading: false,
            };
        },
        props: ['state'],
        mounted: function () {
            this.getBeers();
        },
        computed: {
            load_more: function () {
                return (this.page - 1) * this.limit < this.count && this.count !== 0 && this.count > this.beers.length;
            },

            is_initial_load: function () {
                return this.is_loading && this.beers.length === 0;
            }
        },
        methods: {
            getBeers(page = 1) {
                if (this.is_loading === false) {
                    this.is_loading = true;
                    window.Axios.get('/beer', {
                        params: {
                            page: page,
                            limit: this.limit,
                        },
                    })
                        .then(response => {
                            if (beer.validateResponse(response, 'beers')) {
                                let beers = response.data.data.beers;
                                beers.map(beer => {
                                    beer.is_expanded = false;

                                    return beer;
                                });

                                this.beers = this.beers.concat(beers);
                                this.page = response.data.data.page;
                                this.count = response.data.data.count;
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
                            });
                        })
                        .then(() => {
                            this.is_loading = false;
                        });
                }
            }
        },
    };
</script>