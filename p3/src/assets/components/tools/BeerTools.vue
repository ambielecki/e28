<template>
    <div class="columns is-multiline">
        <div class="column is-full">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Brewing Tools and Calculators</p>
                </header>
            </div>
        </div>

        <div class="column is-one-third">
            <beer-alcohol-calculator></beer-alcohol-calculator>
        </div>

        <div class="column is-one-third">
            <beer-tools-coming-soon></beer-tools-coming-soon>
        </div>
    </div>
</template>

<script>
    import BeerAlcoholCalculator from "./BeerAlcoholCalculator";
    import BeerToolsComingSoon from "./BeerToolsComingSoon";

    export default {
        components: { BeerAlcoholCalculator, BeerToolsComingSoon },
        data: function () {
            return {};
        }
    };
</script>