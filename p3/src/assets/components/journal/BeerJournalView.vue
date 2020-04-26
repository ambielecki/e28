<template>
    <div>
        <div class="columns">
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

            <beer-journal-view-expanded
                v-else
                :beer="beer"
                :show_collapse="false"
                @collapse-beer="beer.is_expanded = false"
            ></beer-journal-view-expanded>
        </div>
    </div>
</template>

<script>
    import BeerJournalViewExpanded from "./parts/BeerJournalViewExpanded";

    export default {
        components: { BeerJournalViewExpanded },
        data: function () {
            return {
                beer: {},
                is_loading: true,
            };
        },
        mounted: function () {
            this.getBeer(this.$route.params.id);

        },
        methods: {
            getBeer: async function (id) {
                if (Object.prototype.hasOwnProperty.call(this.$store.state.beers, id)) {
                    this.beer = this.$store.state.beers[id];
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
    };
</script>