<script type="text/x-template" id="audit-content">
    <div class="columns is-multiline">
        <div class="column is-full">
            <div v-for="(record, index) in audit" :key="index" class="audit">
                <p><b>Round: {{ record.round }}</b></p>
                <p><b>Dealer:</b> {{ record.dealer_total }}  {{ record.dealer_hand }}</p>
                <p><b>Player:</b> {{ record.player_total }}  {{ record.player_hand }}</p>
                <p><b>Winner:</b> {{ record.winner }}</p>
                <p><b>Initial Bet:</b> {{ record.initial_bet }}, <b>Doubled:</b> {{ record.doubled }}, <b>Purse:</b> {{ record.purse_adjustment }}</p>
                <hr>
            </div>
        </div>
    </div>
</script>