
class BlackJack {
    constructor() {
        this._shuffleDeck();
        this.deck = [];
        this.playerWins = null;
        this.playersHand = [];
        this.dealersHand = [];
        this.playersTotal = 0;
        this.dealersTotal = 0;
        this.dealerTakesCard = true;
        this.lastState = "";
    }
    sumScore() {
        this._sumValuesPlayer();
        this._sumValuesDealer();
    }

    reset() {
        if (this.deck.length < 10) {
            this._shuffleDeck();
        }
        this.deck = [];
        this.playerWins = null;
        this.playersHand = [];
        this.dealersHand = [];
        this.playersTotal = 0;
        this.dealersTotal = 0;
        this.dealerTakesCard = true;
        this.sumScore()
        this.lastState = "";
        return { "playersTotal": this.playersTotal, "playersHand": this.playersHand, "dealersTotal": this.dealersTotal, "dealersHand": this.dealersHand, "playerWins": this.playerWins, "dealerTakeNewCard": this.dealerTakesCard };
    }

    firstHand() {
        if (this.lastState === "" && this.dealersTotal < 21 && this.playersTotal < 21) {
            this._randomCard(true);
            this._randomCard(false);
            this._randomCard(true);
            this.sumScore()
            this.dealerTakesCard = false;
            this.lastState = "firstHand";
        }
        if (this.playersTotal === 21) {
            this.playerWins = true;
        }
        return { "playersTotal": this.playersTotal, "playersHand": this.playersHand, "dealersTotal": this.dealersTotal, "dealersHand": this.dealersHand, "playerWins": this.playerWins, "dealerTakeNewCard": this.dealerTakesCard };
        
    }
    playersChoice() {
        if ((this.lastState === "firstHand" || this.lastState === "playersHand") && this.dealersTotal < 21 && this.playersTotal < 21) {
            this._randomCard(true);
            this.sumScore()
            if (this.playersTotal > 21) {
                this.playerWins = "lost";
                this.dealerTakesCard = false;
            }
            this.lastState = "playersHand";
        }
        return { "playersTotal": this.playersTotal, "playersHand": this.playersHand, "dealersTotal": this.dealersTotal, "dealersHand": this.dealersHand, "playerWins": this.playerWins, "dealerTakeNewCard": this.dealerTakesCard };
       
    }
    dealersTurns() {
        while (this.dealersTotal <= 17 && this.playersTotal != 21) {
            if ((this.lastState === "firstHand" || this.lastState === "playersHand" || this.lastState === "dealersTurn") && this.dealersTotal < 21 && this.playersTotal < 21) {
                this._randomCard(false);
                this.sumScore();
                if (this.dealersTotal < 17) {
                    this.dealerTakesCard = true;
                } else if (this.dealersTotal > 21) {
                    this.dealerTakesCard = false;
                    this.playerWins = "win";
                } else if (this.playersTotal > this.dealersTotal) {
                    this.dealerTakesCard = false;
                    this.playerWins = "win";
                } else {
                    this.dealerTakesCard = false;
                    this.playerWins = "lost";
                }
                this.lastState = "dealersTurn";
            }
        }
            return { "playersTotal": this.playersTotal, "playersHand": this.playersHand, "dealersTotal": this.dealersTotal, "dealersHand": this.dealersHand, "playerWins": this.playerWins, "dealerTakeNewCard": this.dealerTakesCard };
        
    }
    _randomCard(player) {
        if (this.deck.length < 10) {
            this._shuffleDeck();
        }
        let getRandomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
        for (let i = 0; i < this.deck.length; i++) {
            if (this.deck[i] === getRandomCard) {
                this.deck.splice(i);
                break;
            }
        }
        if (player) {
            this.playersHand.push(getRandomCard);
        } else {
            this.dealersHand.push(getRandomCard);
        }
    }
    _sumValuesPlayer() {
        let matrix = { 1: 11, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 10, 12: 10, 13: 10 };
        let points = 0;
        for (let i = 0; i < this.playersHand.length; i++) {
            if (points + 11 > 21 && (this.playersHand[i] === "1C" || this.playersHand[i] === "1D" || this.playersHand[i] === "1H" || this.playersHand[i] === "1S")) {
                points += 1
            }  else {
                points += matrix[parseInt(this.playersHand[i].slice(0, -1))];
            }
        }
        if (this.playersHand.length == 2 && points== 22) {
            points = 12;
        }
        this.playersTotal = points;
    }

    _sumValuesDealer() {
        let matrix = { 1: 11, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 10, 12: 10, 13: 10 };
        let points = 0;
        for (let i = 0; i < this.dealersHand.length; i++) {
            if (points + 11 > 21 && (this.dealersHand[i] === "1C" || this.dealersHand[i] === "1D" || this.dealersHand[i] === "1H" || this.dealersHand[i] === "1S")) {
                points += 1
            } else {
                points += matrix[parseInt(this.dealersHand[i].slice(0, -1))];
            }
        }
        if (this.dealersHand.length == 2 && points == 22) {
            points = 12;
        }
        this.dealersTotal = points;
    }

    _shuffleDeck() {
            
            let deckOfCards = [];
            for (let x = 0; x < 5; x++) {
                for (let i = 0; i < 4; i++) {
                    for (let n = 1; n < 14; n++) {
                        switch (i) {
                            case 0:
                                deckOfCards.push(n + "C");
                                break;
                            case 1:
                                deckOfCards.push(n + "D");
                                break;
                            case 2:
                                deckOfCards.push(n + "S");
                                break;
                            case 3:
                                deckOfCards.push(n + "H");
                                break;
                            default:
                                return false;
                        }
                    }
                }
        }
        this.deck = deckOfCards;
    };
};

module.exports = BlackJack