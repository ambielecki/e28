<template>
    <div class="column is-half">
        <div class="card">
            <header class="card-header">
                <router-link :to="{ name: 'journal-view', params: { id: beer.id, } }" class="card-header-title">{{ beer.name }}</router-link>
            </header>

            <div class="card-content">
                <div class="content">
                    <div class="columns is-multiline is-mobile">
                        <div v-if="beer.style" class="column is-half">
                            <b>Style: </b>{{ styles[beer.style] }}
                        </div>

                        <div v-if="beer.primary_fermentation_start" class="column is-half">
                            <b>Start Date: </b>{{ beer.primary_fermentation_start | date-format }}
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
                                <button class="button is-link" @click="expandBeer">Expand</button>
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
            return {};
        },
        props: ['beer'],
        methods: {
            expandBeer: function () {
                this.$emit('expand-beer');
            }
        },
        computed: {
            styles: function () {
                return this.$store.state.styles;
            }
        },
    };
</script>