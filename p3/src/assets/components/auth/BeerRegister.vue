<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Register</p>
        </header>

        <div class="card-content">
            <div class="columns is-multiline">
                <div class="column is-half">
                    <div class="field">
                        <label class="label" for="first_name">First Name</label>
                        <div class="control">
                            <input
                                id="first_name"
                                class="input"
                                type="text"
                                placeholder="First Name"
                                v-model="user.first_name"
                                @keyup.enter="register"
                            >
                        </div>
                        <p class="help is-danger" v-if="$v.user.first_name.$anyError">
                            First Name is Required
                        </p>
                    </div>
                </div>

                <div class="column is-half">
                    <div class="field">
                        <label class="label" for="last_name">Last Name</label>
                        <div class="control">
                            <input
                                id="last_name"
                                class="input"
                                type="text"
                                placeholder="Last Name"
                                v-model="user.last_name"
                                @keyup.enter="register"
                            >
                        </div>
                        <p class="help is-danger" v-if="$v.user.last_name.$anyError">
                            Last Name is Required
                        </p>
                    </div>
                </div>

                <div class="column is-half">
                    <div class="field">
                        <label class="label" for="email">Email</label>
                        <div class="control">
                            <input
                                id="email"
                                class="input"
                                type="text"
                                placeholder="Email Address"
                                v-model="user.email"
                                @keyup.enter="register"
                            >
                        </div>
                        <p class="help is-danger" v-if="$v.user.email.$anyError">
                            Email is required and must be in a valid format
                        </p>
                    </div>
                </div>
            </div>

            <div class="columns is-multiline">
                <div class="column is-half">
                    <div class="field">
                        <label class="label" for="password">Password</label>
                        <div class="control">
                            <input
                                id="password"
                                class="input"
                                type="password"
                                placeholder="Password: Min 6 Characters"
                                v-model="user.password"
                                @keyup.enter="register"
                            >
                        </div>
                        <p class="help is-danger" v-if="$v.user.password.$anyError">
                            Password is required and must match confirmation (6 character minmum)
                        </p>
                    </div>
                </div>

                <div class="column is-half">
                    <div class="field">
                        <label class="label" for="password_confirmation">Confirm Password</label>
                        <div class="control">
                            <input
                                id="password_confirmation"
                                class="input"
                                type="password"
                                placeholder="Confirm Password"
                                v-model="user.password_confirmation"
                                @keyup.enter="register"
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column is-full">
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" @click="register">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { email, required, minLength, sameAs } from 'vuelidate/lib/validators';

    export default {
        data: function () {
            return {
                user: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
            }
        },
        validations: {
            user: {
                first_name: {
                    required,
                },
                last_name: {
                    required,
                },
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                    minLength: minLength(6),
                    sameAs: sameAs('password_confirmation'),
                },
            },
        },
        methods: {
            register: async function() {
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

                    let is_logged_in = await this.$beerApi.postRegister(this.user);
                    this.$store.commit('setLogin', is_logged_in);

                    if (is_logged_in) {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-success',
                            message: 'Thank you for registering!!',
                        });

                        // from the Vue router docs, this is nice
                        window.history.length > 1 ? this.$router.go(-1) : this.$router.push({ name: 'home' })
                    }
                } catch (error) {
                    this.handleErrors(error);
                }
            }
        },
    }
</script>