<template>
    <transition-group name="fade" tag="div" class="notifications container">
        <div
            v-for="(message, key) in messages"
            :key="'message' + key"
            :class="message.type"
            class="notification"
            data-test="notification"
        >
            <button class="delete" @click="removeMessage(key)" data-test="notification-dismiss"></button>
            {{ message.message }}
        </div>
    </transition-group>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        computed: {
            messages: function () {
                return this.$store.state.messages;
            }
        },
        methods: {
            removeMessage(key) {
                this.$store.commit('removeMessage', key)
            },
        },
    };
</script>

<style>
    .notifications {
        position: sticky;
        top: 20px;
        z-index: 10;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>