const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        platform: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
        },
        isPublic: {
            type: Boolean,
        },
        genre: {
            type: String,
            trim: true,
        },
        hoursPlayed: {
            type: Number,
            min: 0,
        },
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