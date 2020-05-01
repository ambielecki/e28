<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Simple ABV Calculator</p>
        </header>

        <div class="card-content">
            <div class="content">
                <div class="columns is-multiline">
                    <div class="column is-full">
                        <div class="field">
                            <label class="label" for="original_gravity">Original Gravity</label>
                            <div class="control">
                                <input
                                    id="original_gravity"
                                    class="input"
                                    type="text"
                                    placeholder="OG"
                                    v-model="original_gravity"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="column is-full">
                        <div class="field">
                            <label class="label" for="final_gravity">Final Gravity</label>
                            <div class="control">
                                <input
                                    id="final_gravity"
                                    class="input"
                                    type="text"
                                    placeholder="OG"
                                    v-model="final_gravity"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="column is-full">
                        <label class="label">ABV</label>
                        <p class="is-size-1">{{ abv }} %</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import accounting from 'accounting';

    export default {
        data: function () {
            return {
                original_gravity: 1.055,
                final_gravity: 1.010,
            };
        },
        computed: {
            abv: function () {
                let abv = (this.original_gravity - this.final_gravity) * 131.25;

                return accounting.formatNumber(abv, 1);
            }
        }
    };
</script>