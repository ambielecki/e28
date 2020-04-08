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
                            v-model="beer.type"
                        >
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
    </div>
</template>

<script>
    export default {
        props: ['beer', 'styles'],
        data: function () {
            return {};
        },
    };
</script>