<template>
    <div v-if="show_messages" class="notifications container">
        <transition-group name="fade">
            <div
                v-for="(message, key) in state.messages"
                :key="key"
                :class="message.type"
                class="notification"
            >
                <button class="delete" @click="$emit('remove-message', key)"></button>
                {{ message.message }}
            </div>

        </transition-group>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        props: ['state'],
        computed: {
            show_messages: function () {
                return this.state.messages.length > 0;
            }
        },
    };
</script>

<style>
    .notifications {
        position: sticky;
        top: 20px;
        z-index: 10;
    }
</style>