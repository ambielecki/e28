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
                                    <div class="column is-full">
                                        <div class="field">
                                            <label class="label" for="search">Search</label>
                                            <div class="control">
                                                <input
                                                    id="search"
                                                    class="input"
                                                    type="text"
                                                    placeholder="Search By Name, Yeast, or Recipe"
                                                    v-model="params.search"
                                                    @keyup="searchBeers"
                                                    data-test="search"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-mobile is-multiline">
                                    <div class="column is-one-fourth is-half-mobile">
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
                                                            v-for="(name, value) in styles"
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

                                    <div class="column is-one-fourth is-half-mobile">
                                        <div class="field">
                                            <label class="label" for="rating">Rating</label>
                                            <div class="control is-expanded">
                                                <div class="select is-fullwidth">
                                                    <select
                                                        id="rating"
                                                        v-model="params.rating"
                                                        @change="filterBeers()"
                                                    >
                                                        <option :value="null">All</option>
                                                        <option
                                                            v-for="n in 5"
                                                            :value="n"
                                                            :key="n"
                                                        >
                                                            {{ n === 5 ? '' : '>=' }} {{ n }} {{ n === 1 ? 'Star' : 'Stars' }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column is-one-fourth is-half-mobile">
                                        <div class="field">
                                            <label class="label" for="sort">Sort By</label>
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
                                                        <option value="rating">Rating</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column is-one-fourth is-half-mobile">
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
                                </div>
                                <div class="buttons">
                                    <button
                                        class="button is-link"
                                        @click="$router.push({ name: 'journal-create' })"
                                        data-test="create-entry"
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

        <template v-if="beers.length > 0">
            <template v-for="(beer, key) in beers">
                <beer-journal-view-compressed
                    v-if="!beer.is_expanded"
                    :beer="beer"
                    :key="key"
                    @expand-beer="beer.is_expanded = true"
                ></beer-journal-view-compressed>
                <beer-journal-view-expanded
                    v-else
                    :beer="beer"
                    :key="key"
                    :show_collapse="true"
                    @collapse-beer="beer.is_expanded = false"
                ></beer-journal-view-expanded>
            </template>

            <div v-if="load_more" class="column is-full">
                <div class="buttons is-centered">
                    <button
                        class="button is-link"
                        :class="{ 'is-loading': is_loading }"
                        @click="getBeers(page + 1)"
                        data-test="load-more"
                    >
                        Load More Beer!
                    </button>
                </div>
            </div>
        </template>

        <template v-if="!is_initial_load && beers.length === 0">
            <div class="column is-full">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">You Have Not Logged Any Beers Yet! Get Brewing!</p>
                    </header>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import BeerJournalViewCompressed from "./parts/BeerJournalViewCompressed";
    import BeerJournalViewExpanded from "./parts/BeerJournalViewExpanded";

    export default {
        components: { BeerJournalViewExpanded, BeerJournalViewCompressed },
        data: function () {
            return {
                beers: [],
                page: 0,
                count: 0,
                params: {
                    limit: 5, // TODO :: implement ability to change this
                    rating: null,
                    style: null,
                    search: '',
                    sort: 'primary_fermentation_start',
                    sort_direction: 'DESC',
                },
                is_loading: false,
            };
        },
        mounted: function () {
            this.getBeers();
        },
        computed: {
            load_more: function () {
                return (this.page - 1) * this.params.limit < this.count && this.count !== 0 && this.count > this.beers.length;
            },
            is_initial_load: function () {
                return this.is_loading && this.beers.length === 0;
            },
            styles: function () {
                return this.$store.state.styles;
            }
        },
        methods: {
            getBeers: async function(page = 1) {
                if (this.is_loading === false) {
                    this.is_loading = true;
                    let params = this.params;
                    params.page = page;
                    try {
                        let data = await this.$beerApi.getList(params);
                        if (data.length > 0) {
                            let [beers, page, count] = data;

                            beers.forEach((beer) => {
                                this.$store.commit('cacheBeer', beer);
                            });

                            beers.map(beer => {
                                beer.is_expanded = false;

                                return beer;
                            });

                            this.beers = this.beers.concat(beers);
                            this.page = page;
                            this.count = count;
                        }

                        this.is_loading = false;
                    } catch (error) {
                        this.handleErrors(error);

                        this.is_loading = false;
                    }
                }
            },
            filterBeers() {
                this.beers = [];
                this.getBeers();
            },
            searchBeers() {
                // https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.filterBeers();
                }, 500);
            },
        },
    };
</script>