<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Login</p>
                </header>

                <div class="card-content">
                    <div class="columns is-multiline">
                        <div class="column is-full">
                            <div class="field">
                                <label class="label" for="email">Email</label>
                                <div class="control">
                                    <input
                                        id="email"
                                        class="input"
                                        type="text"
                                        placeholder="Email Address"
                                        v-model="$v.email.$model"
                                        @keyup.enter="login"
                                    >
                                </div>
                                <p class="help is-danger" v-if="$v.email.$anyError">
                                    Email is required and must be in a valid format
                                </p>
                            </div>
                        </div>

                        <div class="column is-full">
                            <div class="field">
                                <label class="label" for="password">Password</label>
                                <div class="control">
                                    <input
                                        id="password"
                                        class="input"
                                        type="password"
                                        placeholder="Password"
                                        v-model="$v.password.$model"
                                        @keyup.enter="login"
                                    >
                                </div>
                                <p class="help is-danger" v-if="$v.password.$anyError">
                                    Password is required (6 character minimum)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-full">
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link" @click="login">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators';

    export default {
        data: function () {
            return {
                email: '',
                password: '',
            }
        },
        validations: {
            email: {
                required,
                email,
            },
            password: {
                minLength: minLength(6),
                required,
            },
        },
        methods: {
            login: async function () {
                try {
                    this.$v.$touch();

                    if (this.$v.$anyError) {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-danger',
                            message: 'Please fix form errors before submission',
                        });

                        return
                    }

                    let is_logged_in = await this.$beerApi.login(this.email, this.password);
                    this.$store.commit('setLogin', is_logged_in);

                    if (is_logged_in) {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-success',
                            message: 'Successfully logged in, welcome back!',
                        });

                        // from the Vue router docs, this is nice
                        window.history.length > 1 ? this.$router.go(-1) : this.$router.push({ name: 'home' })
                    }
                } catch (error) {
                    this.handleErrors(error);
                }
            },
        },
    }
</script>