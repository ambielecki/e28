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
        result: 'Dealer won with blackjack',
    },
    player_blackjack: {
        message: 'Blackjack! You win 1.5x your bet',
        result: 'Player won with blackjack',
    },
    win: {
        message: 'You won!',
        result: 'Player won',
    },
    lose: {
        message: 'Sorry, you lost',
        result: 'Dealer won',
    },
    bust: {
        message: 'Sorry, you lost',
        result: 'Player busted'
    },
    push: {
        message: 'You pushed, your bet has been returned',
        result: 'Push',
    },
};

const winner_dealer = 'dealer';
const winner_player = 'player';
const winner_push = 'push';

// makes it easier to reset the default game state
function getDefaultData() {
    return {
        can_double: false,
        current_bet: null,
        dealer_hand: [],
        deck: [],
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
    };
}

Vue.component('playing-area', {
    template: `
        <div class="column is-full" id="dealer_area">
            <div class="columns is-mobile is-multiline">
                <div class="column is-full">
                    <h2 class="subtitle has-text-white">{{ owner + ': ' + owner_score}}</h2>
                </div>
                
                <playing-card 
                  v-for="(card, index) in cards" 
                  v-bind:card="card"
                  v-bind:key="index"
                ></playing-card>
            </div>
        </div>
    `,
    props: ['owner', 'owner_score', 'cards'],
});

// can find conditional formatting here
Vue.component('playing-card', {
    template: `
        <div class="column level is-narrow card_wrapper">
            <div 
              class="card has-text-centered level-item playing_card" 
              v-bind:class="[card.class, card.show_card ? '' : 'has-background-link']"
            >
                <div class="card-content">
                    <p v-if="card.show_card">{{ card.text }}<span v-html="card.suit"></span></p>
                </div>
            </div>
        </div>
    `,
    props: ['is_dealer_turn', 'card'],
});

Vue.component('message', {
    template: `
        <p v-bind:class="message_class" class="card-header-title">
            {{ message }}
        </p>
    `,
    props: ['message', 'message_class'],
});


let blackjack = new Vue({
    el: '#blackjack',

    data: getDefaultData(),

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
            }

            return this.is_dealer_turn ? this.dealer_status.value : 'Shows ' + this.dealer_status.shown_value;
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
                    shown_value: shown_value + 10,
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
                            class: suit,
                            suit: suits[suit],
                            show_card: false,
                        });
                    });
                });
            }
        },

        startGame() {
            this.clearMessage();

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
                    this.endGame(winner_push, end_messages.push);
                } else {
                    this.endGame(winner_dealer, end_messages.dealer_blackjack);
                }

                return true;
            }

            // check for player blackjack
            if (this.player_status.value === 21) {
                this.player_purse += (0.5 * this.current_bet); // blackjack bonus
                this.endGame(winner_player, end_messages.player_blackjack);

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

        // handle bets and end messaging
        endGame(winner, message = '') {
            this.game_over = true;

            switch(winner) {
                case winner_player:
                    this.scoreboard.wins++;
                    this.player_purse += (2 * this.current_bet);
                    break;
                case winner_dealer:
                    this.scoreboard.losses++;
                    break;
                default:
                    this.scoreboard.draws++;
                    this.player_purse += this.current_bet;
            }

            let result_message = 'Round ' + this.scoreboard_total +': ' + message.result;
            this.message = message.message;

            switch(message.message) {
                case end_messages.dealer_blackjack.message:
                case end_messages.lose.message:
                case end_messages.bust.message:
                    this.message_class = text_danger;
                    result_message = result_message + '. Player lost ' + this.current_bet;
                    break;
                case end_messages.player_blackjack.message:
                    result_message = result_message + '. Player won ' + (1.5 * this.current_bet);
                    this.message_class = text_success;
                    break;
                case end_messages.win.message:
                    result_message = result_message + '. Player won ' + this.current_bet;
                    this.message_class = text_success;
                    break;
                default:
                    this.message_class = text_black;
            }

            this.results.push(result_message);
        },

        hitMe() {
            this.can_double = false;
            this.player_hand.push(this.dealCard());

            if (this.player_status.value > 21) {
                this.endGame(winner_dealer, end_messages.bust)
            }
        },

        stay() {
            this.can_double = false;
            this.showDealerCards();

            while (this.dealer_status.value < 17 || (this.dealer_status.value === 17 && this.dealer_status.is_soft)) {
                this.dealer_hand.push(this.dealCard());
            }

            if (this.dealer_status.value > 21 || this.player_status.value > this.dealer_status.value) {
                this.endGame(winner_player, end_messages.win);
            } else if (this.dealer_status.value > this.player_status.value) {
                this.endGame(winner_dealer, end_messages.lose);
            } else {
                this.endGame(winner_push, end_messages.push);
            }
        },

        doubleDown() {
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
            Object.assign(this.$data, getDefaultData());
            this.shuffleDeck();
        },
    },

    mounted: function () {
        this.shuffleDeck();
    }
});