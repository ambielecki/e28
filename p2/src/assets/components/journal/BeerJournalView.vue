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
                :state="state"
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

        props: ['state'],

        mounted: function () {
            window.Axios.get('/beer/' + this.$route.params.id, {})
                .then(response => {
                    this.beer = response.data.data.beer;
                    this.is_loading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.is_loading = false;
                });
        }
    };
</script>