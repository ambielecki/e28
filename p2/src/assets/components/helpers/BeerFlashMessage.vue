<template>
    <div v-if="state.success_messages.length > 0" class="notification is-success">
        <button class="delete"></button>
        <ul>
            <li v-for="(success_message, key) in state.success_messages" :key="key">{{ success_message.message }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        props: ['state'],
    };
</script>