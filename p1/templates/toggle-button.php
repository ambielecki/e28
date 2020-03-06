<script type="text/x-template" id="toggle-button">
    <button
        v-if="display"
        class="button is-primary is-small"
        v-on:click="$emit('toggle', true)"
    >
        {{ text }}
    </button>
</script>