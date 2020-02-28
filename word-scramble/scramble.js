let app = new Vue({
    el: '#scramble',
    data: {
        game_on: false,
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

        available_words: function () {
            return Object.keys(this.words[this.selected_sport]);
        },

        shuffled_word: function () {
            let word_array = this.selected_word.split('');
            let word_length = this.selected_word.length;

            return [word_array, word_length];
        }
    },
    methods: {
        gameOn: function () {
            this.game_on = true;

            let filtered_words = this.available_words.filter(word => word !== this.selected_word);
            this.selected_word = filtered_words[Math.floor(Math.random() * filtered_words.length)];
        },
    },
});