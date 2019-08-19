$(function(){
  // var deck = setDeck();
  //
  // deck = start(deck);
  // deck.forEach(function(element) {
  //   console.log(element);
  // });
  var gameover = false;
  var playerHand = [];
  var dealerHand = [];
  var deck = setDeck();

  start(deck, playerHand, dealerHand);

  $("#player-total").text(handTotal(playerHand));

  $("#dealer-total").text(handTotal(dealerHand));

  winner(playerHand, dealerHand);
  $("#hit").click(function() {
    hit(deck, playerHand, "player");
    //$(".player-hand").append("<p>" + element + "<p>");
    $("#player-total").text(handTotal(playerHand));
    dealerAi(deck, dealerHand);
  });


});

function winner(playerHand, dealerHand) {
  if(handTotal(playerHand) === 21) {
    if(handTotal(dealerHand === 21)) {
      console.log("draw");
      gameover = true;
    } else {
      console.log("Player Wins!");
      gameover = true;
    }
  } else if(handTotal(dealerHand) === 21){
    console.log("Dealer Wins!");
    gameover = true;
  } else if(handTotal(playerHand) > 21) {
    console.log("Dealer Wins!");
    gameover = true;
  } else if(handTotal(dealerHand) > 21) {
    console.log("Player Wins!");
    gameover = true;
  }

}

function dealerAi(deck, dealerHand) {
  if(handTotal(dealerHand) <= 16) {
    hit(deck, dealerHand, "dealer");
    $("#dealer-total").text(handTotal(dealerHand));
  }
}

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

function start(deck, playerHand, dealerHand) {
  deck = hit(deck, playerHand, "player");
  deck = hit(deck, dealerHand, "dealer");
  deck = hit(deck, playerHand, "player");
  deck = hit(deck, dealerHand, "dealer");

  return deck;
}

function hit(deck, personHand, person) {
  var rand = Math.floor(Math.random() * deck.length);
  personHand.push(deck[rand]);
  // $(".player-hand").append("<p>" + deck[rand] + "<p>");
  $("." + person + "-hand").append("<p>" + deck[rand] + "<p>");

  deck = deck.slice(0, rand).concat(deck.slice(rand+1,deck.length));

  return deck;
}

function handTotal(personHand) {
  var total = 0;

  for(let i=0; i<personHand.length; i++) {
    if(personHand[i].includes("Ace")) {
      personHand.push(personHand.splice(i, 1)[0]);
    }
  }

  personHand.forEach(function(card) {
    if(parseInt(card)) {
      total += parseInt(card);
    } else if(card.includes("Jack") || card.includes("Queen") || card.includes("King")){
      total += 10;
    } else {
      if(total + 11 > 21) {
        total += 1;
      } else {
        total += 11;
      }
    }
  });
  return total;
}
