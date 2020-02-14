let app = new Vue({
    el: '#app',
    data: {
        player_name: '',
        guesses: [],
        guess: null,
    },
    methods: {
        handleGuess: function () {
            this.guesses.push(this.guess);
            this.guess = null;
        },
    },
});