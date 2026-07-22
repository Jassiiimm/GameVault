const Review = require('../models/review')

const create = async (req, res) => {
    req.body.game = req.params.gameId
    req.body.author = req.session.user._id

    await Review.create(req.body)

    res.redirect(`/games/${req.params.gameId}`)
}

const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.reviewId)

    if (!review.author.equals(req.session.user._id)) {
        return res.redirect(`/games/${req.params.gameId}`)
    }

    await Review.findByIdAndDelete(req.params.reviewId)

    res.redirect(`/games/${req.params.gameId}`)
}

module.exports = {
    create: create,
    deleteReview: deleteReview,
}