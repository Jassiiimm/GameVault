const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        image: String,
        description: String,
        status: String,
        isPublic: Boolean,
        genre: String,
        hoursPlayed: Number,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Game = mongoose.model('Game', gameSchema)

module.exports = Game