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
    let games

    if (req.session.user) {
        games = await Game.find({
            $or: [
                { isPublic: true },
                { owner: req.session.user._id },
            ],
        })
    } else {
        games = await Game.find({
            isPublic: true,
        })
    }

    res.render('games/index.ejs', {
        games: games,
    })
}

const show = async (req, res) => {
    const game = await Game.findById(req.params.gameId)

    const isCreator =
        req.session.user &&
        game.owner.equals(req.session.user._id)

    if (!game.isPublic && !isCreator) {
        return res.redirect('/games')
    }

    res.render('games/show.ejs', {
        game: game,
    })
}

const deleteGame = async (req, res) => {
    const game = await Game.findById(req.params.gameId)

    if (!game.owner.equals(req.session.user._id)) {
        return res.redirect(`/games/${req.params.gameId}`)
    }

    await Game.findByIdAndDelete(req.params.gameId)

    res.redirect('/games')
}

const edit = async (req, res) => {
    const game = await Game.findById(req.params.gameId)

    if (!game.owner.equals(req.session.user._id)) {
        return res.redirect(`/games/${req.params.gameId}`)
    }

    res.render('games/edit.ejs', {
        game: game,
    })
}

const update = async (req, res) => {
    const game = await Game.findById(req.params.gameId)

    if (!game.owner.equals(req.session.user._id)) {
        return res.redirect(`/games/${req.params.gameId}`)
    }

    req.body.isPublic = req.body.isPublic === 'on'

    await Game.findByIdAndUpdate(req.params.gameId, req.body)

    res.redirect(`/games/${req.params.gameId}`)
}
const mine = async (req, res) => {
    const games = await Game.find({
        owner: req.session.user._id,
    })

    res.render('games/mine.ejs', {
        games: games,
    })
}

module.exports = {
    new: newGame,
    create: create,
    index: index,
    show: show,
    deleteGame: deleteGame,
    edit: edit,
    update: update,
    mine: mine,
}