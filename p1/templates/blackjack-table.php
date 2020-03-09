<script type="text/x-template" id="blackjack-table">
    <div class="column is-full" id="dealer_area">
        <div class="columns is-mobile is-multiline">
            <div class="column is-full">
                <h2 class="subtitle has-text-white">{{ owner + ': ' + owner_score}}</h2>
            </div>

            <blackjack-card
                v-for="(card, index) in cards"
                :card="card"
                :key="index"
            ></blackjack-card>
        </div>
    </div>
</script>