
// The deck object consists of a deck builder and a shuffle algorithm.

function Deck() {
  
    //shuffle algorithm adopted from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var shuffle = function(array) {
       var currentIndex = array.length, temporaryValue, randomIndex;

       // While there remain elements to shuffle...
       while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    // A suit is built, then duplicated twice. the second time, 
    //the deck has two suits from the first dupe, resulting in a full deck.

    var deck = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    deck = deck.concat(deck);
    deck = deck.concat(deck);
    return {
        deck: deck,
        shuffle : function() { 
            shuffle(this.deck); 
        }
    }
};