<template>
    <div v-if="state.success_messages.length > 0" class="notifications container">
        <transition-group name="fade">
            <div v-for="(success_message, key) in state.success_messages" :key="key + 'success'" class="notification is-success">
                <button class="delete" @click="$emit('remove-success', key)"></button>
                {{ success_message.message }}
            </div>

            <div v-for="(warning_message, key) in state.warning_messages" :key="key + 'warning'" class="notification is-danger">
                <button class="delete" @click="$emit('remove-warning', key)"></button>
                {{ warning_message.message }}
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
                return this.state.success_messages.length > 0 || this.state.warning_messages.length > 0;
            }
        },
    };
</script>