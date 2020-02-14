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

Vue.component('playing-area', {
    template: `
        <div class="column is-full" id="dealer_area">
            <div class="columns is-mobile is-multiline">
                <div class="column is-full">
                    <h2 class="subtitle has-text-white">{{ owner }}</h2>
                </div>
                
                <playing-card v-for="card in cards" v-bind:card="card"></playing-card>
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
                <p v-if="card.show_card">{{ card.text }}<span v-html="card.suit"></span></p>
            </div>
        </div>
    `,
    props: ['is_dealer_turn', 'card'],
});


let blackjack = new Vue({
    el: '#blackjack',

    data: {
        dealer_hand: [],
        deck: [],
        is_dealer_turn: false,
        player_hand: [],
    },

    methods: {
        dealCard(show_card = true) {
            let card = this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
            card.show_card = show_card;

            return card;
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