<script type="text/x-template" id="playing-card">
    <div class="column level is-narrow">
        <div
            class="card has-text-centered level-item playing_card"
            :class="[card.card_class, { 'has-background-link': !card.show_card }]"
        >
            <div class="card-content">
                <p v-html="card_text"></p>
            </div>
        </div>
    </div>
</script>