let app = new Vue({
    el: '#scramble',
    data: {
        correct_guess: false,
        game_on: false,
        guessed: false,
        message: '',
        player_guess: '',
        player_name: '',
        selected_word: '',
        selected_sport: 'baseball',
        words: {
            baseball: {
                hitter: 'The person holding the bat',
                pitcher: 'Stands on the mound',
                umpire: 'Calls balls and strikes',
                fastball: 'Pitch with the highest speed',
                strike: 'A swing and a miss',
            },
            football: {
                touchdown: 'Worth six points',
                interception: 'A pass thrown to the defense',
                safety: 'Sacked in your own end zone',
                fumble: 'Dropped the ball',
                yard: 'Unit of distance',
            },
            basketball: {
                foul: 'Contact with another player',
                dribble: 'Bounce the ball up and down',
                basket: 'Where you shoot the ball',
                center: 'Generally your tallest player',
                swish: 'The sound of a shot that only hits the net',
            },
            hockey: {
                puck: 'Hockey does not have a ball, it has a ...',
                goalie: 'Defends the goal',
                check: 'Legal hit of another player',
                zamboni: 'Fixes the ice',
                canada: 'The NHL plays in the US and ...'
            },
        },
    },
    computed: {
        sports: function () {
            return Object.keys(this.words);
        },

        // Randomize JS array https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        shuffled_word: function () {
            let word_array = this.selected_word.split('');
            let word_length = this.selected_word.length;

            for (let i = word_length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [word_array[i], word_array[j]] = [word_array[j], word_array[i]];
            }

            return word_array.join('');
        },
    },
    methods: {
        gameOn: function () {
            this.game_on = true;
            this.guessed = false;
            this.player_guess = '';

            // make sure we don't get the same word twice in a row
            let filtered_words = Object.keys(this.words[this.selected_sport])
                .filter(word => word !== this.selected_word);

            // get random item from array https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
            this.selected_word = filtered_words[Math.floor(Math.random() * filtered_words.length)];
        },

        guess: function () {
            this.guessed = true;
            this.correct_guess = this.player_guess.toLowerCase() === this.selected_word;
            this.message = this.correct_guess
                ? 'You got it! Nice work'
                : "Sorry, that's not correct. Please try again.";
        },

        playAgain: function () {
            this.game_on = false;
        }
    },
});