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
    const all_butttons = document.querySelectorAll('button');

    const dealer_1 = {
        el: document.querySelector('#dealer_1'),
        p: {},
        card: {},
    };

    const dealer_2 = {
        el: document.querySelector('#dealer_2'),
        p: {},
        card: {},
    };

    const player_card = {
        el: document.querySelector('#player_card'),
        p: {},
        card: {},
    };

    dealer_1.p = dealer_1.el.querySelectorAll('p')[0];
    dealer_2.p = dealer_2.el.querySelectorAll('p')[0];
    player_card.p = player_card.el.querySelectorAll('p')[0];

    const cards = [dealer_1, dealer_2, player_card];

    const inside = document.querySelector('#inside');
    const outside = document.querySelector('#outside');

    // Reset cards
    cards.forEach(card => hideCard(card));

    // Hide Play Game and Show Game Buttons
    all_butttons.forEach(button => switchButton(button));

    // Create the Deck
    let deck = [];

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

function switchButton(button) {
    if (button.style.display === 'none') {
        button.style.display = 'inline-block';
    } else {
        button.style.display = 'none';
    }
}