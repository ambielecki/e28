<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Update Password</p>
                </header>

                <div class="card-content">
                    <div class="columns is-multiline">
                        <div class="column is-full">
                            <div class="field">
                                <label class="label" for="current_password">Current Password</label>
                                <div class="control">
                                    <input
                                        id="current_password"
                                        class="input"
                                        type="password"
                                        placeholder="Current Password"
                                        v-model="current_password"
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="column is-full">
                            <div class="field">
                                <label class="label" for="new_password">New Password</label>
                                <div class="control">
                                    <input
                                        id="new_password"
                                        class="input"
                                        type="password"
                                        placeholder="New Password"
                                        v-model="new_password"
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="column is-full">
                            <div class="field">
                                <label class="label" for="new_password_confirmation">Confirm New Password</label>
                                <div class="control">
                                    <input
                                        id="new_password_confirmation"
                                        class="input"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        v-model="new_password_confirmation"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-full">
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link" @click="resetPassword">Update Password</button>
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
                current_password: '',
                new_password: '',
                new_password_confirmation: '',
            }
        },
        methods: {
            resetPassword: async function () {
                try {
                    let success = await this.$beerApi.postUpdatePassword({
                        current_password: this.current_password,
                        new_password: this.new_password,
                        new_password_confirmation: this.new_password_confirmation,
                    });

                    if (success) {
                        this.$store.commit('addMessage', {
                            time: 5,
                            type: 'is-success',
                            message: 'Password Reset',
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