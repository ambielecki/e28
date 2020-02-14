Vue.component('playing-card', {
    template: `
        <div class="column is-narrow card_wrapper">
            <div class="card playing_card show_card">
    
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

    },
});