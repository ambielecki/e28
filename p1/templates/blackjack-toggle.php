<script type="text/x-template" id="blackjack-toggle">
    <button
        v-if="display"
        class="button is-primary is-small"
        v-on:click="$emit('toggle')"
    >
        {{ text }}
    </button>
</script>