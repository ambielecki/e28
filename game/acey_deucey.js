class Card {
    constructor(element_id) {
        this.el = document.querySelector(element_id);
        this.p = this.el.querySelectorAll('p')[0];
        this.card = {};
    }

    show() {
        this.el.classList.remove('card_hidden');
        this.el.classList.add('card_active');
        this.p.innerHTML = this.card ? this.card.text : '';
    }

    hide() {
        this.el.classList.remove('card_active');
        this.el.classList.add('card_hidden');
        this.p.innerHTML = '';
    }

    /*
     * found this on SO a while back
     * (https://stackoverflow.com/questions/39967891/dealing-cards-from-a-deck-and-removing-the-cards-from-an-array)
     * return a random card and remove from the deck
     */
    deal(deck) {
        this.card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];

        return deck;
    }
}

const playing_cards = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
};

const messages = {
    bet: {
        win: 'You won!',
        lose: 'You lost!',
        post: 'You lost double your bet!',
    },
    pass: {
        win: 'You passed, but you would have won!',
        lose: 'You passed, you would have lost!',
        post: 'You passed, you would have lost double your bet!',
    }
};

// All necessary elements
const all_buttons = document.querySelectorAll('button');
const play_game = document.querySelector('#play_game');
const game_buttons = document.querySelectorAll('.game_btn');
const message = document.querySelector('#message');

let dealer_1 = new Card('#dealer_1');
let dealer_2 = new Card('#dealer_2');
let player_card = new Card('#player_card');

const cards = [dealer_1, dealer_2, player_card];
let deck = [];

// Listener to start a game
play_game.addEventListener('click', setUpGame);

// Game Action listeners
game_buttons.forEach(game_button => {
    game_button.addEventListener('click', function (event) {
        deck = player_card.deal(deck);

        handleBet(event, dealer_1, dealer_2, player_card);
    });
});

function setUpGame() {
    message.classList.toggle('hidden');

    // Reset cards and deck
    cards.forEach(card => card.hide());
    deck = [];

    // Build deck
    for (let i = 0; i < 4; i++) {
        Object.keys(playing_cards).forEach(playing_card => {
            deck.push({
                text: playing_card,
                value: playing_cards[playing_card],
            });
        });
    }

    // Get Dealer Cards
    deck = dealer_1.deal(deck);
    deck = dealer_2.deal(deck);

    dealer_1.show();
    dealer_2.show();

    // Cannot continue if dealer cards have same value
    if (dealer_1.card.value === dealer_2.card.value) {
        message.innerHTML = 'Dealer Cards Are Even, no bet';
        message.classList.toggle('hidden');

        return true;
    }

    // Hide Play Game, Show Game Action Buttons
    all_buttons.forEach(button => button.classList.toggle('hidden'));
}

function handleBet(event, dealer_1, dealer_2, player_card) {
    let action = event.target.id;
    let result = '';
    let test = ((player_card.card.value - dealer_1.card.value) * (player_card.card.value - dealer_2.card.value));

    if (test === 0) {
        result = 'post';
    } else if (test <= 0) {
        result = 'win';
    } else {
        result = 'lose';
    }

    player_card.show();
    message.innerHTML = messages[action][result];
    message.classList.toggle('hidden');

    // Switch from Game Action to Start Game Button
    all_buttons.forEach(button => button.classList.toggle('hidden'));
}