const Review = require('../models/review')

const create = async (req, res) => {
    req.body.game = req.params.gameId
    req.body.author = req.session.user._id

    await Review.create(req.body)

    res.redirect(`/games/${req.params.gameId}`)
}

module.exports = {
    create: create,
}