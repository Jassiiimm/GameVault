const Game = require('../models/game')

const newGame = (req, res) => {
    res.render('games/new.ejs')
}
const index = async (req, res) => {
    const games = await Game.find()

    res.render('games/index.ejs', {
        games: games,
    })
}
const show = async (req, res) => {
    const game = await Game.findById(req.params.gameId)

    res.render('games/show.ejs', {
        game: game,
    })
}

module.exports = {
    new: newGame,
    index: index,
    show: show,
}