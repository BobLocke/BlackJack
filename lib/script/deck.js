// Simple Blackjack Game
// Ryan "Bob" Dean

var deck = [];

var Hand = {
    hand = [];
    total = 0;
    visTotal = 0;
    money = 500;
}
 
var player = new Hand;
var dealer = new Hand;



var shuffle = function(deck) {
    deck = [];
    for(var i = 0; i < 4; i++) {
        deck.push('A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K');
    }
    for(var i = deck.length - 1; i > 0, i--){
        var key = Math.floor(Math.random * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

var deal = function(h) {
    card = deck.shift();
    h.hand.unshift(card);
    if (card === 'A') { total += 1;
    } else if (card === 'J' || card === 'Q' || card === 'K') { total += 10 }
    } else total += card;
    return;
}



var init = function() {
    shuffle(deck);
    deal(player);
    console.log("Player is dealt: " + player.hand[0]);
    deal(dealer);
    deal(player);
    console.log("Player is dealt: " player.hand[0] ", for a total of " player.total);
    deal(dealer);
    console.log("Dealer is dealt: " + dealer.hand[0] + "for ?");