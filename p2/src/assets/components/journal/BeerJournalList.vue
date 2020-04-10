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
                            <div class="column is-full">
                                <progress v-if="is_initial_load" class="progress is-large is-info" max="100"></progress>
                                <p v-else>Filters will go here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-for="(beer, key) in beers" :key="key" class="column is-half">
            <div class="card">
                <header class="card-header">
                    <router-link :to="{ name: 'journal-view', params: { id: beer.id, } }" class="card-header-title">{{ beer.name }}</router-link>
                </header>

                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline is-mobile">
                            <div v-if="beer.style" class="column is-half">
                                <b>Style: </b>{{ state.styles[beer.style] }}
                            </div>

                            <div v-if="beer.primary_fermentation_start" class="column is-half">
                                <b>Start Date: </b>{{ beer.primary_fermentation_start }}
                            </div>

                            <div v-if="beer.yeast" class="column is-half">
                                <b>Yeast: </b>{{ beer.yeast }}
                            </div>

                            <div v-if="beer.rating" class="column is-half">
                                <b>Rating: </b>{{ beer.rating }}
                            </div>
                        </div>

                        <div class="columns is-multiline">
                            <div v-if="beer.recipe" class="column is-full">
                                <b>Recipe:</b>
                                <br>
                                <div v-html="$options.filters.truncate(beer.recipe, 50)"></div>
                            </div>

                            <div v-if="beer.brew_notes" class="column is-full">
                                <b>Brew Notes:</b>
                                <br>
                                <div v-html="$options.filters.truncate(beer.brew_notes, 50)"></div>
                            </div>

                            <div v-if="beer.tasting_notes" class="column is-full">
                                <b>Tasting Notes:</b>
                                <br>
                                <div v-html="$options.filters.truncate(beer.tasting_notes, 50)"></div>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-full">
                                <div class="buttons">
                                    <button class="button is-link" @click="viewBeer(beer.id)">View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="load_more" class="column is-full">
            <div class="buttons is-centered">
                <button class="button is-link" :class="{ 'is-loading': is_loading }" @click="getBeers(page + 1)">Load More Beer!</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
                            this.beers = this.beers.concat(response.data.data.beers);
                            this.page = response.data.data.page;
                            this.count = response.data.data.count;
                            this.is_loading = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                            this.is_loading = false;
                        });
                }
            },

            viewBeer(id) {
                this.$router.push({
                    name: 'journal-view',
                    params: {
                        id: id,
                    },
                })
            }
        },
    };
</script>