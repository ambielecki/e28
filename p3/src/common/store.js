import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logged_in: false,
        messages: [],
        styles: [],
    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state, index) {
            state.messages.splice(index, 1);
        },
        decrementMessageTimes(state) {
            state.messages.map(function (message) {
                message.time--;

                return message;
            })
        },
        removeExpiredMessages(state) {
            state.messages = state.messages.filter(function (message) {
                return message.time > 0;
            })
        },
    },
});