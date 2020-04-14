<template>
    <div class="columns is-multiline">
        <div class="column is-full">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Brewing Journal</p>
                </header>

                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline">
                            <div class="column is-full" v-if="is_initial_load">
                                <progress  class="progress is-large is-info" max="100"></progress>
                            </div>
                            <div class="column is-full">
                                <h5>Filters</h5>
                                <div class="columns">
                                    <div class="column is-one-fourth">
                                        <div class="field">
                                            <label class="label" for="style">Style</label>
                                            <div class="control is-expanded">
                                                <div class="select is-fullwidth">
                                                    <select
                                                        id="style"
                                                        v-model="params.style"
                                                        @change="filterBeers()"
                                                    >
                                                        <option :value="null">All</option>
                                                        <option
                                                            v-for="(name, value) in state.styles"
                                                            :value="value"
                                                            :key="value"
                                                        >
                                                            {{ name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column is-one-fourth">
                                        <div class="field">
                                            <label class="label" for="sort">Sort</label>
                                            <div class="control is-expanded">
                                                <div class="select is-fullwidth">
                                                    <select
                                                        id="sort"
                                                        v-model="params.sort"
                                                        @change="filterBeers()"
                                                    >
                                                        <option value="primary_fermentation_start">Start Date</option>
                                                        <option value="name">Name</option>
                                                        <option value="style">Style</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column is-one-fourth">
                                        <div class="field">
                                            <label class="label" for="sort_direction">Sort Direction</label>
                                            <div class="control is-expanded">
                                                <div class="select is-fullwidth">
                                                    <select
                                                        id="sort_direction"
                                                        v-model="params.sort_direction"
                                                        @change="filterBeers()"
                                                    >
                                                        <option value="DESC">Descending</option>
                                                        <option value="ASC">Ascending</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column is-one-fourth">
                                        <div class="field">
                                            <label class="label" for="search">Search</label>
                                            <div class="control">
                                                <input
                                                    id="search"
                                                    class="input"
                                                    type="text"
                                                    placeholder="Search By Name or Yeast"
                                                    v-model="params.search"
                                                    @keyup="searchBeers"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                params: {
                    limit: 5,
                    style: null,
                    search: '',
                    sort: 'primary_fermentation_start',
                    sort_direction: 'DESC',
                },
                is_loading: false,
            };
        },
        props: ['state'],
        mounted: function () {
            this.getBeers();
        },
        computed: {
            load_more: function () {
                return (this.page - 1) * this.params.limit < this.count && this.count !== 0 && this.count > this.beers.length;
            },

            is_initial_load: function () {
                return this.is_loading && this.beers.length === 0;
            }
        },
        methods: {
            getBeers(page = 1) {
                if (this.is_loading === false) {
                    this.is_loading = true;
                    let params = this.params;
                    params.page = page;
                    window.Axios.get('/beer', {
                        params: params,
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
            },
            filterBeers() {
                this.beers = [];
                this.getBeers();
            },
            searchBeers() {
                console.log('outer');

            },
            testDebounce() {
                console.log('testing');
            }
        },
    };
</script>