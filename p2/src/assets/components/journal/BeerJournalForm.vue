<template>
    <div class="columns is-multiline">
        <div class="column is-half">
            <div class="field">
                <label class="label" for="name">Name</label>
                <div class="control">
                    <input
                        id="name"
                        class="input"
                        type="text"
                        placeholder="Name your beer"
                        v-model="beer.name"
                    >
                </div>
            </div>
        </div>

        <div class="column is-half">
            <div class="field">
                <label class="label" for="style">Style</label>
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select
                            id="style"
                            v-model="beer.style"
                        >
                            <option :value="null" disabled>Select Style</option>
                            <option
                                v-for="(name, value) in styles"
                                :value="value"
                                :key="value"
                            >
                                {{ name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="column is-half">
            <div class="field">
                <label class="label" for="primary_fermentation_start">Primary Fermentation Start</label>
                <datepicker
                    placeholder="Select Date"
                    id="primary_fermentation_start"
                    v-model="beer.primary_fermentation_start"
                    :config="{
                        dateFormat: 'm/d/Y H:i',
                        enableTime: true,
                        static: true
                    }"
                ></datepicker>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vue-bulma-datepicker';

    export default {
        components: {
            Datepicker
        },
        props: ['beer', 'styles'],
        data: function () {
            return {};
        },
        mounted: function () {

        },
    };
</script>