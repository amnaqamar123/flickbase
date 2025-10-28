const mongoose = require('mongoose');
require('dotenv').config();
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const UserArticle = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'You need a title of an article.'],
            trim: true,
            maxlength: 100,
        },
        content: {
            type: String,
            required: [true, 'You need a content of an article.'],
            trim: true,
        },
        excerpt: {
            type: String,
            required: [true, 'You need an excerpt of an article.'],
            trim: true,
            maxlength: 500
        },
        score: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
            required: true
        },
        director: {
            type: String,
            required: [true, 'You need a director of an article.'],
            trim: true
        },
        actors: {
            type: [String],
            required: [true, 'You need actors of an article.'],
            trim: true,
            validate: {
                validator: function(array) {
                    return array.length >= 2
                },
                message: 'You need at least 2 actors of an article.'
            }
        },
        status: {
            type: String,
            required: true,
            enum: ['draft', 'public'],
            default: 'draft',
            index: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'You need a category of an article.'],
        },
        // category: {
        //     type: String,
        //     ref: 'Category',
        //     required: [true, 'You need a category of an article.'],
        // },
        date: {
            type: Date,
            default: Date.now
        },
    }
)

UserArticle.plugin(aggregatePaginate);

const ArticleSchema = mongoose.model('Article', UserArticle)

module.exports = { ArticleSchema }