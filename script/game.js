// Simple Blackjack Game
// Ryan "Bob" Dean

/* 
In this game, you begin with 500 credits with which to bet. After the initial deal, 
you can choose to

Hit : Draw a card
Stay: Stop drawing, after which the dealer begins drawing (stays on soft 17)
Double Down: Double your bet, draw a card, then stay. Only available on first draw.

All changed in the game state are displayed on the screen. This log reset on every deal.


*/

var game;
var bet = null;
var radios = document.getElementsByName("bet");
dealBtn = document.getElementById("deal");
hitBtn = document.getElementById("hit");
stayBtn = document.getElementById("stay");
dblBtn = document.getElementById("double");
var money = 500;

var initialMessage = "";

var output = document.getElementById("game");


// code for obtaining radio button value adopted from 
// http://stackoverflow.com/questions/9618504/get-radio-button-value-with-javascript
var getBet = function() {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            bet = radios[i].value;
            break;
        }
    }
};

var log = function(string){
    output.innerHTML += "<p>" + string + "</p>";

};


//  A hand consists of all the card you're holding, 
//  the total value of the cards, and a flag stating whether you're holding an ace
var Hand = function() {
    return {
        hand : [],
        total : 0,
        hasAce : false,
    }
};



/* A game consists of 4 external functions and 2 internal functions

Internal:

    draw : called when the player hits or the dealer has less than 17 total. 
    Draws a card to the hand, and determines if they've busted or not.

    end: Changes the player's credit total according to how the game went, as follows:
        blackjack: 4 * bet
        win: 2 * bet
        draw: bet
        lose: 0

External:

    hit: Player draws a card. Double down is disabled, and if the player busts, the game ends.
    stay: The player is finished drawing and the dealer takes its actions. 
          Then a winnder is determined and the result is sent to end.
    double: player doubles their bet, draws a card, then stays.
    deal: Deals 2 cards to the player and the dealer, only revealing the dealer's 2nd card. 
          If a blackjack is dealt, the player wins immediately.

*/
var Game = function() {

        var player;
        var dealer;
        var deck;
     
    var draw = function(h) {
        var card = deck.deck.pop();
        h.hand.push(card);
        if (card === 'A') { 
            if (h.total > 10) {
                h.total += 1;
            } else { 
                h.total += 11;
                h.hasAce = true;
            }
        } else if (card === 'J' || card === 'Q' || card === 'K') { 
            h.total += 10;
        } else h.total += Number(card);
        if (h.total > 21 && h.hasAce) {
            h.total -= 10;
            h.hasAce = false;
        }
        return;
    };

    var deal = function () {
        if (!bet){
            log("Error: No bet selected. Please select a bet.");
            end(0);
            return;
        }
        dealBtn.disabled = true;
        money -= bet;
        draw(player);
        log("Player bets " + bet + " credits and is dealt: " + player.hand[player.hand.length - 1]);
        draw(dealer);
        draw(player);
        log("Player is dealt: " + player.hand[player.hand.length - 1] + ", for a total of " + player.total);
        draw(dealer);
        log("Dealer is showing " + dealer.hand[player.hand.length - 1]);
        if (player.hand.length === 2 && player.total === 21 && dealer.total != 21){ 
                 log("Blackjack! Player wins "+ (bet*4) + " credits.");
                 end(bet*4);
            } else {
                log("<p> Hit, Stay or Double Down? </p>");
                dblBtn.disabled = false;
                hitBtn.disabled = false;
                stayBtn.disabled = false;
            }
    };

    var double = function() {
        money -= bet;
        bet *= 2;
        log("Player doubles their bet to " + bet + " and draws one card!");
        hit();
        if (player.total <= 21) {
            stay();
        }
    }

    var hit = function () {
        draw(player);
        dblBtn.disabled = true;
        log("Player is dealt: " + player.hand[player.hand.length - 1] + ", for a total of " + player.total);
        if (player.total > 21) {   
                    hitBtn.disabled = true;
                    stayBtn.disabled = true;
                    log("Player busts.");
                    end(0);
        }
    };

    var stay = function() {
        hitBtn.disabled = true;
        stayBtn.disabled = true;
        dblBtn.disabled = true;
        log("Player stays on " + player.total);
        log("Dealer flips facedown card: " + dealer.hand[0] + ", for a total of " + dealer.total);
        while(dealer.total < 17){
            draw(dealer);
        log("Dealer is dealt: " + dealer.hand[dealer.hand.length - 1] + ", for a total of " + dealer.total);

        }
        if (dealer.total > 21) {
            log("Dealer busts. Player wins " + (bet * 2) + " credits.");
            end(bet*2);
        } else if (dealer.total > player.total) {
            log("Dealer wins.");
            end(0);
        } else if (dealer.total === player.total) {
            log("Player draws. Bet is returned.");
            end(Number(bet));
        } else {
           log("Player wins " + (bet * 2) + " credits.");
           end(bet*2);
        }
    }

    var end = function(winnings) {
        money += winnings;
        log("Player has " + money + " credits. Place your bet and deal again?");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked === true) {
                bet = radios[i].value;
            }
            if (money < Number(radios[i].value)){
                radios[i].disabled = true;
                radios[i].checked = false;
                bet = null;
            } else {
                radios[i].disabled = false;
            }
        }
        document.getElementById("deal").disabled = false;
    }


        output.innerHTML = "";
        deck = Deck();
        deck.shuffle(deck);
        player = Hand();
        dealer = Hand();
        deal();

        return {
            hit : hit,
            deal: deal,
            stay: stay,
            double: double
        };
};

var main = function() {
    log("Welcome to Blackjack! Player has " + money + " credits. Place your bet and deal!");
    for (var i = 0; i < radios.length; i++) {
                        radios[i].disabled = false;
                }
    dealBtn.disabled = false;
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    dblBtn.disabled = true;

    hitBtn.addEventListener("click", function() {game.hit()});
    dblBtn.addEventListener("click", function() {game.double()});
    stayBtn.addEventListener("click", function() {game.stay()});
    dealBtn.addEventListener("click", function() { getBet(); game = Game()});
}

