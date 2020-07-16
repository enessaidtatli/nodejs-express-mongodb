const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
type
default
required
unique
*/

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: [10, '{PATH} alanı (`{VALUE}`) , ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: [3, '{PATH} alanı (`{VALUE}`) , ({MINLENGTH}) karakterden büyük olmalıdır.']
    },
    published: {
        type: Boolean,
        default: false
    },
    comments: [{message: String}],
    year:{
        type: Number,
        max: 2030,
        min: 1700
    },
    meta: {
        votes: Number,
        favs: Number
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('books', BookSchema);