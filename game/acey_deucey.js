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

let dealer_1 = {
    el: document.querySelector('#dealer_1'),
    p: {},
    card: {},
};

let dealer_2 = {
    el: document.querySelector('#dealer_2'),
    p: {},
    card: {},
};

let player_card = {
    el: document.querySelector('#player_card'),
    p: {},
    card: {},
};

dealer_1.p = dealer_1.el.querySelectorAll('p')[0];
dealer_2.p = dealer_2.el.querySelectorAll('p')[0];
player_card.p = player_card.el.querySelectorAll('p')[0];

const cards = [dealer_1, dealer_2, player_card];
let deck = [];

play_game.addEventListener('click', setUpGame);

// Add Event Listeners to Game Buttons
game_buttons.forEach(game_button => {
    game_button.addEventListener('click', function (event) {
        [player_card.card, deck] = dealCard(deck);

        handleBet(event, dealer_1, dealer_2, player_card);
    });
});

function setUpGame() {
    // Hide Message
    toggleDisplay(message);

    // Reset cards and deck
    cards.forEach(card => hideCard(card));
    deck = [];

    for (let i = 0; i < 4; i++) {
        Object.keys(playing_cards).forEach(playing_card => {
            deck.push({
                text: playing_card,
                value: playing_cards[playing_card],
            });
        });
    }

    // Get Dealer Cards
    [dealer_1.card, deck] = dealCard(deck);
    [dealer_2.card, deck] = dealCard(deck);

    showCard(dealer_1);
    showCard(dealer_2);

    // Cannot continue if dealer cards have same value
    if (dealer_1.card.value === dealer_2.card.value) {
        message.innerHTML = 'Dealer Cards Are Even, no bet';
        toggleDisplay(message);

        return true;
    }

    // Hide Play Game, Show Game Buttons
    all_buttons.forEach(button => toggleDisplay(button));
}

/*
 * found this on SO a while back
 * (https://stackoverflow.com/questions/39967891/dealing-cards-from-a-deck-and-removing-the-cards-from-an-array)
 * return a random card and remove from the deck
 */
function dealCard(deck) {
    let card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];

    return [card, deck]
}

function showCard(card) {
    card.el.classList.remove('card_hidden');
    card.el.classList.add('card_active');
    card.p.innerHTML = card.card.text;
}

function hideCard(card) {
    card.el.classList.remove('card_active');
    card.el.classList.add('card_hidden');
    card.p.innerHTML = '';
}

function toggleDisplay(el) {
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
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

    showCard(player_card);
    message.innerHTML = messages[action][result];
    toggleDisplay(message);
    all_buttons.forEach(button => toggleDisplay(button));
}