$(function(){
  // var deck = setDeck();
  //
  // deck = start(deck);
  // deck.forEach(function(element) {
  //   console.log(element);
  // });




});

function handCount()

function setDeck() {
  const RANKS = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
  const SUITS = ["Hearts", "Clubs", "Diamonds", "Spades"];
  var deck = [];

  RANKS.forEach(function(rank) {
    SUITS.forEach(function(suit) {
      deck.push(rank + " of " + suit);
    });
  });

  return deck;
}

function start(deck) {
  deck = hit(deck);
  deck = hit(deck);

  return deck;
}

function hit(deck) {
  var rand = Math.floor(Math.random() * deck.length);
  $(".player-hand").append("<p>" + deck[rand] + "<p>");
   
  deck = deck.slice(0, rand).concat(deck.slice(rand+1,deck.length));

  return deck;
}
