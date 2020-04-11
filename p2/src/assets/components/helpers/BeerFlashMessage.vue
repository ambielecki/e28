<template>
    <div v-if="success_messages.length > 0" class="notification is-success">
        <button class="delete"></button>
        <ul>
            <li v-for="(success_message, key) in success_messages" :key="key">{{ success_message }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                success_messages: [
                    'You were successful',
                    'Also success',
                ],
            };
        },
        props: ['state']
    };
</script>