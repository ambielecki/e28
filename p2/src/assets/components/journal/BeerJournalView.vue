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

    const Beer = require('../../../Beer').default;
    let beer = new Beer();

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
                    if (beer.validateResponse(response, 'beer')) {
                        this.beer = response.data.data.beer;
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
    };
</script>