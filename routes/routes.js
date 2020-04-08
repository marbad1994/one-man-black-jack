const express = require('express');
const router = express.Router();



router.get('/restart', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    try {
        const restart = await newRound.reset();
        res.json(restart);
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/deal', async (req, res) => {
    res.type('application/json');
    try {
        const first = await newRound.firstHand();
        if (first.playersTotal == 21) {
            first.playerWins = true;
        }
        res.json(first);
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/hitme/:choice', async (req, res) => {
    try {
        if (req.params.choice == "true") {
            const playersTurn = await newRound.playersChoice();
            res.json(playersTurn);
        } else if (req.params.choice == "false") {
            const dealersTurn = await newRound.dealersTurns();
                res.json(dealersTurn);
            } else {
                res.json({ message: "Choice must be true or false" });
        }   
    } catch (err) {
        res.json({ message: err })
    }
});



module.exports = router;