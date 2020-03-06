<script type="text/x-template" id="result-list">
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{ title }}</p>
        </header>

        <div class="card-content">
            <slot name="results"></slot>
            <slot name="toggle"></slot>
        </div>
    </div>
</script>