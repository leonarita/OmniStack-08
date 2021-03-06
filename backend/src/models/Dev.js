const { Schema, model } = require('mongoose')

const DevSchema = new Schema({
    name: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
},
{
    // Criar colunas createdAt e updatedAt
    timestamps: true
})

module.exports = model('Dev', DevSchema)


