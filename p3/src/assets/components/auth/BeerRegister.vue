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
                            >
                        </div>
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
                            >
                        </div>
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
                            >
                        </div>
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
                                placeholder="Password"
                                v-model="user.password"
                            >
                        </div>
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
        methods: {
            register: async function() {

            }
        },
    }
</script>