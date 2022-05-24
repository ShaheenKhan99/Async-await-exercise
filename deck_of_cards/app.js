$(function() {

  let baseURL = "https://deckofcardsapi.com/api/deck";
  
  // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).


  async function getSingleCard(){
  
    let res = await axios.get(`${baseURL}/new/draw/`);
    let{ suit, value } = res.data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
  
  getSingleCard()
  

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.

  async function getMultipleCards() {
    let res = await axios.get(`${baseURL}/new/draw/`);  
    let card1 = res.data.cards[0];
    let deckId = res.data.deck_id;
    let res2 = await axios.get(`${baseURL}/new/draw/`); 
    let card2 = res2.data.cards[0];
      [card1, card2].forEach(function(card){
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
      });  
  }

  getMultipleCards();

  
// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');
 
  async function drawCardsFromDeck() {
    let response = await axios.get(`${baseURL}/new/shuffle/`);
    deckId = response.data.deck_id;
    $btn.show();

    $btn.on('click', async function() {
    res = await axios.get(`${baseURL}/${deckId}/draw/`)
      let cardImg = res.data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardImg,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
        if (res.data.remaining === 0) $btn.remove();
      });
  };
  
  drawCardsFromDeck()

});  
  
  