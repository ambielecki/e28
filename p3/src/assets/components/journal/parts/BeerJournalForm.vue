<template>
    <div>
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
                    <label class="label" for="yeast">Yeast Strain</label>
                    <div class="control">
                        <input
                            id="yeast"
                            class="input"
                            type="text"
                            placeholder="Yeast Strain"
                            v-model="beer.yeast"
                        >
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
                            dateFormat: 'Y-m-d H:i',
                            enableTime: true,
                            static: true
                        }"
                    ></datepicker>
                </div>
            </div>

            <div class="column is-half">
                <div class="field">
                    <label class="label" for="secondary_fermentation_start">Secondary Fermentation Start</label>
                    <datepicker
                        placeholder="Select Date"
                        id="secondary_fermentation_start"
                        v-model="beer.secondary_fermentation_start"
                        :config="{
                            dateFormat: 'Y-m-d H:i',
                            enableTime: true,
                            static: true
                        }"
                    ></datepicker>
                </div>
            </div>

            <div class="column is-half">
                <div class="field">
                    <label class="label" for="bottling">Bottling</label>
                    <datepicker
                        placeholder="Select Date"
                        id="bottling"
                        v-model="beer.bottling"
                        :config="{
                            dateFormat: 'Y-m-d H:i',
                            enableTime: true,
                            static: true
                        }"
                    ></datepicker>
                </div>
            </div>

            <div class="column is-half">
                <div class="field">
                    <label class="label" for="rating">Rating</label>
                    <div class="control is-expanded">
                        <div class="select is-fullwidth">
                            <select
                                id="rating"
                                v-model="beer.rating"
                            >
                                <option :value="null">Unrated</option>
                                <option
                                    v-for="n in 5"
                                    :value="n"
                                    :key="n"
                                >
                                    {{ n }} {{ n === 1 ? 'Star' : 'Stars' }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns is-multiline">
            <div class="column is-half">
                <div class="field">
                    <label class="label" for="recipe">Recipe</label>
                    <ckeditor
                        :editor="editor"
                        class="textarea"
                        id="recipe"
                        v-model="beer.recipe"
                        placeholder="Recipe"
                    ></ckeditor>
                </div>
            </div>

            <div class="column is-half">
                <div class="field">
                    <label class="label" for="recipe">Brew Notes</label>
                    <ckeditor
                        :editor="editor"
                        class="textarea"
                        id="brew_notes"
                        v-model="beer.brew_notes"
                        placeholder="Brewing Notes"
                    ></ckeditor>
                </div>
            </div>

            <div class="column is-half">
                <div class="field">
                    <label class="label" for="tasting_notes">Tasting Notes</label>
                    <ckeditor
                        :editor="editor"
                        class="textarea"
                        id="tasting_notes"
                        v-model="beer.tasting_notes"
                        placeholder="Tasting Notes"
                    ></ckeditor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vue-bulma-datepicker';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        components: {
            Datepicker: Datepicker,
            ckeditor: CKEditor.component,
        },
        props: ['beer'],
        computed: {
            styles: function () {
                return this.$store.state.styles;
            }
        },
        data: function () {
            return {
                editor: ClassicEditor,
            };
        },
    };
</script>

<style>
    .ck-editor__editable {
        min-height: 200px;
    }
</style>