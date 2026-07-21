const Game = require('../models/game')

const newGame = (req, res) => {
    res.render('games/new.ejs')
}

const create = async (req, res) => {
    req.body.isPublic = req.body.isPublic === 'on'
    req.body.owner = req.session.user._id

    await Game.create(req.body)

    res.redirect('/games')
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

const deleteGame = async (req, res) => {
    await Game.findByIdAndDelete(req.params.gameId)

    res.redirect('/games')
}

const edit = async (req, res) => {
    const game = await Game.findById(req.params.gameId)

    res.render('games/edit.ejs', {
        game: game,
    })
}

module.exports = {
    new: newGame,
    create: create,
    index: index,
    show: show,
    deleteGame: deleteGame,
    edit: edit,
}