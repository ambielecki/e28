Vue.component('playing-area', {
    template: `
        <div class="column is-full" id="dealer_area">
            <div class="columns is-mobile is-multiline">
                <div class="column is-full">
                    <h2 class="subtitle has-text-white">{{ owner }}</h2>
                </div>
                
                <playing-card v-bind:card="card"></playing-card>
                <!-- TODO: cards will go here -->
            </div>
        </div>
    `,
    props: ['owner', 'card'],
});

Vue.component('playing-card', {
    template: `
        <div class="column level is-narrow card_wrapper">
            <div 
              class="card has-text-centered level-item playing_card" 
              v-bind:class="[card.class, card.show_card ? 'show_card' : '']"
            >
                {{ card.text }}<span v-html="card.suit"></span>
            </div>
        </div>
    `,
    props: ['is_dealer_turn', 'card'],
});


let blackjack = new Vue({
    el: '#blackjack',
    data: {
        dealer_card: {
            text: '',
            value: null,
            suit: '',
            class: '',
            show_card: false,
        },
        player_card: {
            text: 'A',
            value: 10,
            suit: '&hearts;',
            class: 'hearts',
            show_card: true,
        },
        dealer_hand: [],
        deck: [],
        is_dealer_turn: false,
        player_hand: [],
    },
    methods: {

    },
});