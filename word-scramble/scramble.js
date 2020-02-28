let app = new Vue({
    el: '#scramble',
    data: {
        play: false,
        player_name: null,
        selected_word: null,
        sport: null,
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
    computed: {},
    methods: {
        playGame: function () {
            this.play = true;
        }
    },
});