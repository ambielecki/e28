/**
 * @typedef {Object} Card
 * @property {number} value - card value
 * @property {string} text - card text, A, K etc
 * @property {string} class - red or black text, the suit
 * @property {string} suit - ascii representation of suit
 * @property {boolean} show_card - visibility
 */

/**
 * @typedef {Object} Status
 * @property {number} value - actual value of hand
 * @property {number} shown_value - visible value of hand
 * @property {boolean} is_soft - if hand has an ace that can be 1 or 11
 */

const card_types = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 1,
};

const suits = {
    'hearts': '&hearts;',
    'diamonds': '&diams;',
    'spades': '&spades;',
    'clubs': '&clubs;',
};

const number_of_decks = 6;
const minimum_bet = 100;

const text_danger = 'has-text-danger';
const text_success = 'has-text-success';
const text_black = 'has-text-black';

const end_messages = {
    dealer_blackjack: {
        message: 'You lost, dealer had blackjack',
        result: 'Dealer won with blackjack. Player lost ',
        class: text_danger,
    },
    player_blackjack: {
        message: 'Blackjack! You win 1.5x your bet',
        result: 'Player won with blackjack. Player won ',
        class: text_success,
    },
    player: {
        message: 'You won!',
        result: 'Player won ',
        class: text_success,
    },
    dealer: {
        message: 'Sorry, you lost',
        result: 'Player lost ',
        class: text_danger,
    },
    player_bust: {
        message: 'Sorry, you lost',
        result: 'Player busted and lost ',
        class: text_danger,
    },
    push: {
        message: 'You pushed, your bet has been returned',
        result: 'Push',
        class: text_black,
    },
};

const winner_dealer = 'dealer';
const dealer_blackjack = 'dealer_blackjack';
const player_bust = 'player_bust';
const winner_player = 'player';
const player_blackjack = 'player_blackjack';
const winner_push = 'push';

Vue.component('blackjack-table', {
    template: '#blackjack-table',
    props: ['owner', 'owner_score', 'cards'],
});

// can find conditional formatting here
Vue.component('blackjack-card', {
    template: '#blackjack-card',
    props: ['is_dealer_turn', 'card'],
    computed: {
        card_text() {
            return this.card.show_card ? this.card.text + this.card.suit: '';
        },
    },
});

Vue.component('blackjack-list-area', {
    template: '#blackjack-list-area',
    props: ['title'],
});

Vue.component('blackjack-results', {
    template: '#blackjack-results',
    props: ['results'],
});

Vue.component('blackjack-audit', {
    template: '#blackjack-audit',
    props: ['audit'],
});

Vue.component('blackjack-toggle', {
    template: '#blackjack-toggle',
    props: {
        display: {
            type: Boolean,
            default: true,
        },
        text: {
            type: String,
            default: 'Toggle',
        }
    },
});

Vue.component('blackjack-message', {
    template: '#blackjack-message',
    props: ['message', 'message_class'],
});


let blackjack = new Vue({
    el: '#blackjack',
    data: {
        audit: [],
        can_double: false,
        current_bet: null,
        dealer_hand: [],
        deck: [],
        doubled: false,
        game_over: true,
        initial_bet: minimum_bet,
        is_dealer_turn: false,
        message: null,
        message_class: null,
        minimum_bet: minimum_bet,
        player_hand: [],
        player_purse: 5000,
        results: [],
        scoreboard: {
            draws: 0,
            losses: 0,
            wins: 0,
        },
        show_audit: false,
    },

    computed: {
        dealer_status: function () {
            return this.calculateStatus(this.dealer_hand);
        },

        player_status: function () {
            return this.calculateStatus(this.player_hand);
        },

        allowed_to_double: function () {
            return this.current_bet <= this.player_purse && this.can_double;
        },

        scoreboard_total: function () {
            return this.scoreboard.wins + this.scoreboard.losses + this.scoreboard.draws;
        },

        dealer_score_view: function () {
            if (this.dealer_hand.length === 2 && this.dealer_status.value === 21) {
                return 'Blackjack';
            } else if (this.is_dealer_turn) {
                return this.dealer_status.value;
            } else {
                return  'Shows ' + this.dealer_status.shown_value;
            }
        },

        player_score_view: function () {
            if (this.player_hand.length === 2 && this.player_status.value === 21) {
                return 'Blackjack';
            }

            return this.player_status.is_soft ? 'Soft ' + this.player_status.value : this.player_status.value;
        },
    },

    methods: {
        /**
         * @param {Card[]} hand
         * @return {Status}
         */
        calculateStatus(hand) {
            let value = 0;
            let shown_value = 0;
            let has_ace = false;

            hand.forEach(card => {
                if (card.text === 'A') {
                    has_ace = true;
                }

                value += card.value;
                if (card.show_card) {
                    shown_value += card.value;
                }
            });

            if (has_ace && value + 10 <= 21) {
                return {
                    value: value + 10,
                    shown_value: shown_value === 1 ? shown_value + 10 : shown_value,
                    is_soft: true
                };
            }

            return {
                value: value,
                shown_value: shown_value,
                is_soft: false,
            };
        },

        clearGame() {
            if (this.deck.length <= number_of_decks * 52 / 2) {
                this.shuffleDeck();
                this.message = 'Shuffled Deck'
            }

            this.dealer_hand = [];
            this.player_hand = [];
            this.can_double = true;
            this.is_dealer_turn = false;
        },

        clearMessage() {
            this.message = null;
            this.message_class = null;
        },

        /**
         * @param {boolean} show_card
         * @return {Card}
         */
        dealCard(show_card = true) {
            let card = this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
            card.show_card = show_card;

            return card;
        },

        decreaseBet() {
            this.clearMessage();

            if (this.initial_bet - minimum_bet >= minimum_bet) {
                this.initial_bet -= minimum_bet;
            } else {
                this.message = 'You cannot bet below the minimum bet';
                this.message_class = text_danger;
            }
        },

        increaseBet() {
            this.clearMessage();

            if (this.initial_bet + minimum_bet <= this.player_purse) {
                this.initial_bet += minimum_bet;
            } else {
                this.message = 'You do not have enough money left to bet more';
                this.message_class = text_danger;
            }
        },

        shuffleDeck() {
            this.deck = [];

            for (let i = 0; i < number_of_decks; i++) {
                Object.keys(suits).forEach(suit => {
                    Object.keys(card_types).forEach(card_type => {
                        this.deck.push({
                            value: card_types[card_type],
                            text: card_type,
                            card_class: suit,
                            suit: suits[suit],
                            show_card: false,
                        });
                    });
                });
            }
        },

        startGame() {
            this.clearMessage();
            this.doubled = false;

            if (this.initial_bet > this.player_purse) {
                this.message_class = text_danger;
                if (this.player_purse < minimum_bet) {
                    this.message = 'You ran out of credits, game over.';
                } else {
                    this.initial_bet = minimum_bet;
                    this.message = 'You cannot bet more than your purse, bet set to minimum';
                }

                return true;
            }

            this.current_bet = this.initial_bet;
            this.player_purse -= this.current_bet;

            this.clearGame();

            this.dealer_hand.push(this.dealCard());
            this.player_hand.push(this.dealCard());
            this.dealer_hand.push(this.dealCard(false));
            this.player_hand.push(this.dealCard());

            // check for dealer blackjack
            if (this.dealer_status.value === 21) {
                this.is_dealer_turn = true;
                this.showDealerCards();

                // check for double blackjack
                if (this.player_status.value === 21) {
                    this.endGame(winner_push);
                } else {
                    this.endGame(dealer_blackjack);
                }

                return true;
            }

            // check for player blackjack
            if (this.player_status.value === 21) {
                this.endGame(player_blackjack);

                return true;
            }

            this.game_over = false;
        },

        // most will have been shown, makes sure we get the hole card
        showDealerCards() {
            this.is_dealer_turn = true;
            this.dealer_hand.forEach(card => {
                card.show_card = true
            });
        },

        // handle bets and end messaging (needs a refactor)
        endGame(winner) {
            this.game_over = true;
            let purse_adjustment = 0;

            switch(winner) {
                case winner_player:
                case player_blackjack:
                    this.scoreboard.wins++;
                    purse_adjustment += (2 * this.current_bet);
                    break;
                case winner_dealer:
                case player_bust:
                case dealer_blackjack:
                    this.scoreboard.losses++;
                    break;
                default:
                    this.scoreboard.draws++;
                    purse_adjustment += this.current_bet;
            }

            if (winner === player_blackjack) {
                purse_adjustment += 0.5 * this.current_bet;
            }

            this.setAudit(purse_adjustment, winner);

            this.player_purse += purse_adjustment;
            this.message = end_messages[winner].message;
            this.message_class = end_messages[winner].class;

            let result_message = 'Round ' + this.scoreboard_total +': ' + end_messages[winner].result;

            switch(winner) {
                case dealer_blackjack:
                case winner_dealer:
                case player_bust:
                    result_message = result_message + this.current_bet;
                    break;
                case player_blackjack:
                    result_message = result_message + (1.5 * this.current_bet);
                    break;
                case winner_player:
                    result_message = result_message + this.current_bet;
                    break;
            }

            this.results.push(result_message);
        },

        hitMe() {
            this.can_double = false;
            this.player_hand.push(this.dealCard());

            if (this.player_status.value > 21) {
                this.endGame(player_bust)
            }
        },

        stay() {
            this.can_double = false;
            this.showDealerCards();

            while (this.dealer_status.value < 17 || (this.dealer_status.value === 17 && this.dealer_status.is_soft)) {
                this.dealer_hand.push(this.dealCard());
            }

            if (this.dealer_status.value > 21 || this.player_status.value > this.dealer_status.value) {
                this.endGame(winner_player);
            } else if (this.dealer_status.value > this.player_status.value) {
                this.endGame(winner_dealer);
            } else {
                this.endGame(winner_push);
            }
        },

        doubleDown() {
            this.doubled = true;
            this.player_purse -= this.current_bet;
            this.current_bet *= 2;
            this.player_hand.push(this.dealCard());

            if (this.player_status.value > 21) {
                this.endGame(winner_dealer, end_messages.bust)
            } else {
                this.stay();
            }
        },

        resetStats() {
            this.audit = [];
            this.can_double = false;
            this.current_bet = null;
            this.dealer_hand = [];
            this.deck = [];
            this.doubled = false;
            this.game_over = true;
            this.initial_bet = minimum_bet;
            this.is_dealer_turn = false;
            this.message = null;
            this.message_class = null;
            this.player_hand = [];
            this.player_purse = 5000;
            this.results = [];
            this.scoreboard = {
                draws: 0,
                losses: 0,
                wins: 0,
            };
            this.show_audit = false;

            this.shuffleDeck();
        },

        setAudit(purse_adjustment, winner) {
            this.audit.push({
                initial_bet: this.initial_bet,
                doubled: this.doubled ? 'True' : 'False',
                dealer_hand: this.dealer_hand.map(card => card.text),
                dealer_total: this.dealer_status.value,
                player_hand: this.player_hand.map(card => card.text),
                player_total: this.player_status.value,
                winner: winner,
                purse_adjustment: purse_adjustment,
                round: this.scoreboard_total,
            });
        },
    },

    mounted: function () {
        this.shuffleDeck();
    }
});