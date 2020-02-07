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

document.addEventListener("DOMContentLoaded", function () {
    const play_game = document.querySelector('#play_game');

    play_game.addEventListener('click', playGame);
});

function playGame() {
    // All necessary elements
    const play_game = document.querySelector('#play_game');
    const game_btns = document.querySelectorAll('.game_btn');
    const cards = document.querySelectorAll('.card');

    const dealer_1 = document.querySelector('#dealer_1');
    const dealer_2 = document.querySelector('#dealer_2');
    const player_card = document.querySelector('#player_card');

    const inside = document.querySelector('#inside');
    const outside = document.querySelector('#outside');

    // Reset cards
    cards.forEach(card => {
        hideCard(card)
    });

    // Clear Previous Game Cards
    cards.forEach(card => {
        eraseCard(card);
    });

    // Get Correct Buttons
    play_game.style.display = 'none';
    game_btns.forEach(game_btn => game_btn.style.display = 'inline-block');

    // Create the Deck
    let deck = [];

    for (let i = 0; i < 4; i++) {
        Object.keys(playing_cards).forEach(playing_card => {
            deck.push(playing_card);
        });
    }

    // Get Dealer Cards
    let dealer_1_value = '';
    let dealer_2_value = '';

    [dealer_1_value, deck] = dealCard(deck);
    [dealer_2_value, deck] = dealCard(deck);

    showCard(dealer_1);
    showCard(dealer_2);

    setCardValue(dealer_1, dealer_1_value);
    setCardValue(dealer_2, dealer_2_value);
}

/*
 * found this on SO a while back
 * (https://stackoverflow.com/questions/39967891/dealing-cards-from-a-deck-and-removing-the-cards-from-an-array)
 * return a random card and remove from the deck
 */
function dealCard(deck) {
    let card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];

    return [card, deck];
}

function hideCard(card) {
    card.classList.remove('card_active');
    card.classList.add('card_hidden');
}

function showCard(card) {
    card.classList.remove('card_hidden');
    card.classList.add('card_active');
}

function eraseCard(card) {
    card.querySelectorAll('p')[0].innerHTML = '';
}

function setCardValue(card, value) {
    card.querySelectorAll('p')[0].innerHTML = value;
}