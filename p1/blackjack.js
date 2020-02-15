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

function getDefaultData() {

}

Vue.component('playing-area', {
    template: `
        <div class="column is-full" id="dealer_area">
            <div class="columns is-mobile is-multiline">
                <div class="column is-full">
                    <h2 class="subtitle has-text-white">{{ owner }}</h2>
                </div>
                
                <playing-card 
                  v-for="(card, index) in cards" 
                  v-bind:card="card"
                  v-bind:key="index"
                ></playing-card>
            </div>
        </div>
    `,
    props: ['owner', 'cards'],
});

Vue.component('playing-card', {
    template: `
        <div class="column level is-narrow card_wrapper">
            <div 
              class="card has-text-centered level-item playing_card" 
              v-bind:class="[card.class, card.show_card ? 'show_card' : '']"
            >
                <div class="card-content">
                    <p v-if="card.show_card">{{ card.text }}<span v-html="card.suit"></span></p>
                </div>
            </div>
        </div>
    `,
    props: ['is_dealer_turn', 'card'],
});


let blackjack = new Vue({
    el: '#blackjack',

    data: {
        current_bet: null,
        dealer_hand: [],
        deck: [],
        initial_bet: minimum_bet,
        is_dealer_turn: false,
        message: null,
        message_class: null,
        minimum_bet: minimum_bet,
        player_hand: [],
        player_purse: 5000,
        scoreboard: {
            draws: 0,
            losses: 0,
            wins: 0,
        },
        winner: null,
    },

    computed: {
        dealer_status: function () {
            return this.calculateStatus(this.dealer_hand);
        },

        player_status: function () {
            return this.calculateStatus(this.player_hand);
        }
    },

    methods: {
        calculateStatus(hand) {
            let value = 0;
            let has_ace = false;

            hand.forEach(card => {
                if (card.text === 'A') {
                    has_ace = true;
                }

                value += card.value;
            });

            if (has_ace && value + 10 <= 21) {
                return {value: value + 10, is_soft: true};
            }

            return {value: value, is_soft: false};
        },

        clearMessage() {
            this.message = null;
            this.message_class = null;
        },

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
    },

    mounted() {
        this.shuffleDeck();

        this.dealer_hand.push(this.dealCard());
        this.player_hand.push(this.dealCard());
        this.dealer_hand.push(this.dealCard(false));
        this.player_hand.push(this.dealCard());
    },
});