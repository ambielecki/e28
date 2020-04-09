<template>
    <div class="columns is-multiline">
        <div class="column is-full">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Brewing Journal</p>
                </header>

                <div class="card-content">
                    <div class="content">
                        Filters will go here
                    </div>
                </div>
            </div>
        </div>

        <div v-for="(beer, key) in beers" :key="key" class="column is-half">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">{{ beer.name }}</p>
                </header>

                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline is-mobile">
                            <div class="column is-half">
                                <b>Style: </b>{{ state.styles[beer.style] }}
                            </div>

                            <div class="column is-half">
                                <b>Start Date: </b>{{ beer.primary_fermentation_start }}
                            </div>

                            <div class="column is-half">
                                <b>Yeast: </b>{{ beer.yeast }}
                            </div>

                            <div class="column is-half">
                                <b>Rating: </b>{{ beer.rating }}
                            </div>
                        </div>
                    </div>
                </div>
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
                limit: 25,
            };
        },

        props: ['state'],

        mounted: function () {
            this.getBeers();
        },

        computed: {
            load_more: function () {
                return this.page * this.limit < this.count;
            }
        },

        methods: {
            getBeers(page = 1) {
                window.Axios.get('/beer', {
                    params: {
                        page: page,
                        limit: this.limit,
                    },
                })
                    .then(response => {
                        this.beers = response.data.data.beers;
                        this.page = response.data.data.page;
                        this.count = response.data.data.page;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    };
</script>