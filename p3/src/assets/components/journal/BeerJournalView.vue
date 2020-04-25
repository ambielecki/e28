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
            window.Axios.get('/beer/' + this.$route.params.id, {})
                .then(response => {
                    if (this.validateResponse(response, 'beer')) {
                        this.beer = response.data.data.beer;
                    }
                })
                .catch(error => {
                    this.handleErrors(error);
                })
                .then(() => {
                    this.is_loading = false;
                });
        }
    };
</script>