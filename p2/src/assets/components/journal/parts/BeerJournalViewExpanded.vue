<template>
    <div class="column is-full">
        <div class="card">
            <header class="card-header">
                <router-link :to="{ name: 'journal-view', params: { id: beer.id, } }" class="card-header-title">{{ beer.name }}</router-link>
            </header>

            <div class="card-content">
                <div class="content">
                    <div class="columns is-multiline">
                        <div v-if="beer.style" class="column is-one-third">
                            <b>Style: </b>{{ state.styles[beer.style] }}
                        </div>

                        <div v-if="beer.yeast" class="column is-one-third">
                            <b>Yeast: </b>{{ beer.yeast }}
                        </div>

                        <div v-if="beer.rating" class="column is-one-third">
                            <b>Rating: </b>{{ beer.rating }}
                        </div>
                    </div>

                    <div class="columns is-multiline">
                        <div v-if="beer.primary_fermentation_start" class="column is-third">
                            <b>Primary Fermentation Start: </b>{{ beer.primary_fermentation_start | date-format }}
                        </div>

                        <div v-if="beer.secondary_fermentation_start" class="column is-third">
                            <b>Secondary Fermentation Start: </b>{{ beer.secondary_fermentation_start | date-format }}
                        </div>

                        <div v-if="beer.bottling" class="column is-third">
                            <b>Bottling Date: </b>{{ beer.bottling | date-format }}
                        </div>
                    </div>

                    <div class="columns is-multiline">
                        <div v-if="beer.recipe" class="column is-half">
                            <b>Recipe:</b>
                            <br>
                            <div v-html="beer.recipe"></div>
                        </div>

                        <div v-if="beer.brew_notes" class="column is-half">
                            <b>Brew Notes:</b>
                            <br>
                            <div v-html="beer.brew_notes"></div>
                        </div>

                        <div v-if="beer.tasting_notes" class="column is-half">
                            <b>Tasting Notes:</b>
                            <br>
                            <div v-html="beer.tasting_notes"></div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-full">
                            <div class="buttons">
                                <button v-if="show_collapse" class="button is-link" @click="collapseBeer">Collapse</button>
                                <button v-if="show_collapse" class="button is-link" @click="goToBeer(beer.id)">View Beer</button>
                                <button v-if="!show_collapse" class="button is-link" @click="editBeer(beer.id)">Edit Beer</button>
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
        props: {
            beer: {
                type: Object,
            },
            state: {
                type: Object,
            },
            show_collapse: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            collapseBeer: function () {
                this.$emit('collapse-beer');
            },

            goToBeer: function (id) {
                this.$router.push({
                    name: 'journal-view',
                    params: {
                        id: id,
                    },
                })
            },

            editBeer: function (id) {
                this.$router.push({
                    name: 'journal-edit',
                    params: {
                        id: id,
                    },
                })
            }
        },
    };
</script>