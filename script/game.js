// Simple Blackjack Game
// Ryan "Bob" Dean

var game;
var bet;
var radios = document.getElementsByName("bet");
dealBtn = document.getElementById("deal");
hitBtn = document.getElementById("hit");
stayBtn = document.getElementById("stay");
var money = 500;

var output = document.getElementById("game");


// code for obtain radio button value adopted from 
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

var Hand = function() {
    return {
        hand : [],
        total : 0,
        hasAce : false,
    }
};

var Game = function() {

        var player;
        var dealer;
        var deck;
        var finished = false;
     
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
        dealBtn.disabled = true;
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
                log("<p> Hit or Stay? </p>");
                hitBtn.disabled = false;
                stayBtn.disabled = false;
            }
    };

    var hit = function () {
        draw(player);
        log("Player is dealt: " + player.hand[player.hand.length - 1] + ", for a total of " + player.total);
        if (player.total > 21) {   
                    log("Player busts.");
                    end(0);
        }
    };

    var stay = function() {
        hitBtn.disabled = true;
        stayBtn.disabled = true;
        log("Player stays on " + player.total);
        log("Dealer flips facedown card: " + dealer.hand[0]+", for a total of " + dealer.total);
        while(dealer.total < 17){
            draw(dealer);
        log("Dealer is dealt: " + dealer.hand[player.hand.length - 1] + ", for a total of " + dealer.total);

        }
        if (dealer > 21) {
            log("Dealer busts. Player wins " + (bet * 2) + " credits.");
            end(bet*2);
        } else if (dealer.total > player.total) {
            log("Dealer wins.");
        } else if (dealer.total === player.total) {
            log("Player draws. Bet is returned.");
            end(bet);
        } else {
           log("Player wins " + (bet * 2) + "credits.");
           end(bet*2);
        }
    }

    var end = function(winnings) {
        money += winnings;
        log("Player has " + money + " credits. Place your bet and deal again?");
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
            stay: stay
        };
};

hitBtn.addEventListener("click", function() {game.hit()});
stayBtn.addEventListener("click", function() {game.stay()});
dealBtn.addEventListener("click", function() { getBet(); game = Game()});