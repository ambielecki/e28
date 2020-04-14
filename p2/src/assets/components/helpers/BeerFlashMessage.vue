<template>
    <transition name="fade">
        <div v-if="show_messages" class="notifications container">
            <div
                v-for="(message, key) in state.messages"
                :key="key"
                :class="message.type"
                class="notification"
            >
                <button class="delete" @click="$emit('remove-message', key)"></button>
                {{ message.message }}
            </div>
        </div>
    </transition>
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