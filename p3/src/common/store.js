import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logged_in: false,
        messages: [],
        styles: {},
        beers: {},
        home_content: '',
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

        cacheBeer(state, beer) {
            state.beers[beer.id] = beer;
        },

        cacheHomeContent(state, content) {
            state.home_content = content;
        },
    },
    getters: {
        checkCachedBeer(state) {
            return function (id) {
                return Object.prototype.hasOwnProperty.call(state.beers, id);
            }
        },
        getCachedBeer(state) {
            return function (id) {
                return state.beers[id];
            }
        },
    },
});