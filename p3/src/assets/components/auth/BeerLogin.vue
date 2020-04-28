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
                                        v-model="email"
                                        @keyup.enter="login"
                                    >
                                </div>
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
                                        v-model="password"
                                        @keyup.enter="login"
                                    >
                                </div>
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
    export default {
        data: function () {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            login: async function () {
                try {
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