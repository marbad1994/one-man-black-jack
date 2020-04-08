import React, { Component } from "react";
import { Button, Alert } from "reactstrap";


class StartGame extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            playersTotal: 0,
            playersCards: [],
            dealersTotal: 0,
            dealersCards: [],
            playerWins: null,
            dealerTakesCard: true,
        })
    }

    componentDidMount() {
        fetch('/api/restart')


            .then(res => res.json())
            .then(data => {

                this.setState({ playersTotal: data.playersTotal });
                this.setState({ playersCards: data.playersHand });
                this.setState({ dealersTotal: data.dealersTotal });
                this.setState({ dealersCards: data.dealersHand });
                this.setState({ playerWins: data.playerWins });
                this.setState({ dealerTakesCard: data.dealerTakesCard });
            })
            .catch(err => {
                console.log(err);
            })
    }

    reset = () => {
        fetch('/api/restart')


            .then(res => res.json())
            .then(data => {

                this.setState({ playersTotal: data.playersTotal });
                this.setState({ playersCards: data.playersHand });
                this.setState({ dealersTotal: data.dealersTotal });
                this.setState({ dealersCards: data.dealersHand });
                this.setState({ playerWins: data.playerWins });
                this.setState({ dealerTakesCard: data.dealerTakesCard });
            })
            .catch(err => {
                console.log(err);
            })
    }

    stop = () => {
        fetch('/api/hitme/false')


            .then(res => res.json())
            .then(data => {

                this.setState({ playersTotal: data.playersTotal });
                this.setState({ playersCards: data.playersHand });
                this.setState({ dealersTotal: data.dealersTotal });
                this.setState({ dealersCards: data.dealersHand });
                this.setState({ playerWins: data.playerWins });
                this.setState({ dealerTakesCard: data.dealerTakesCard });
            })
            .catch(err => {
                console.log(err);
            })
        if (this.state.dealerTakesCard) {
            this.stop()
        }
    }
    hitMe = () => {
        fetch('/api/hitme/true')


            .then(res => res.json())
            .then(data => {

                this.setState({ playersTotal: data.playersTotal });
                this.setState({ playersCards: data.playersHand });
                this.setState({ dealersTotal: data.dealersTotal });
                this.setState({ dealersCards: data.dealersHand });
                this.setState({ playerWins: data.playerWins });
                this.setState({ dealerTakesCard: data.dealerTakesCard });
            })
            .catch(err => {
                console.log(err);
            })
    }

    deal = () => {
        fetch('/api/deal')
                
            
            .then(res => res.json())
            .then(data => {

                this.setState({ playersTotal: data.playersTotal });
                this.setState({ playersCards: data.playersHand });
                this.setState({ dealersTotal: data.dealersTotal });
                this.setState({ dealersCards: data.dealersHand });
                this.setState({ playerWins: data.playerWins });
                this.setState({ dealerTakesCard: data.dealerTakesCard });
            })
            .catch(err => {
                console.log(err);
            })
    }
 
    addCards = (hand, id) => {
        let cards = [];
        const imgUrl = '/images/';
        const fileEnding = '.png';
        for (let i = 0; i < hand.length; i++) {
            cards.push(<img key={`${i}${id}`} src={`${process.env.PUBLIC_URL}/assets${imgUrl}${hand[i]}${fileEnding}`} width={50} alt={hand[i]}/>);
        }
        return cards
    }

    banner = (playerWins) => {
        let alert;
        if (playerWins === "win" || this.state.playersTotal === 21) {
            alert = (<Alert color="success">Congratulations!</Alert>);
        } else if (playerWins === "lost") {
            alert = (<Alert color="danger">Better luck next time!</Alert>);
        }
        return alert;
    }


    render() {


        const PlayerCards = (

            <div style={{ minHeight: '240px' }}>
                <h1>Players Cards</h1>
                <h1>{this.state.playersTotal}</h1>
                <br />
                {this.addCards(this.state.playersCards, "player")}
            </div>
        )
        const DealerCards = (
            <div style={{ minHeight: '240px' }} >
                <h1>Dealers Cards</h1>
                <h1>{this.state.dealersTotal}</h1>
                    <br />
                    {this.addCards(this.state.dealersCards, "dealer")}
                    </div>
        )


        const Cards = (

            <div style={{ marginTop: '100px' }}><div style={{ textShadow: '1px 1px 1px #FFFFEE'}}>{PlayerCards} {DealerCards}</div>
                <div><Button width={100} color="success" onClick={this.deal}>Start</Button>
                <Button width={100} color="primary" onClick={this.hitMe}>Hit Me</Button>
                <Button width={100} color="warning" onClick={this.stop}>I'm Done</Button>
                    <Button width={100} color="danger" onClick={this.reset}>Restart</Button></div>
                <br/>
                <div>{this.banner(this.state.playerWins)}</div>
            </div>
            )
        return (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'green', minHeight: '800px' }}> {Cards} </div>
        )

    }
};

export default StartGame;
