const mongoose = require('mongoose');
require('dotenv').config();

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 100,
    },
    date: {type: Date, default: Date.now},
});

const Category = mongoose.model('Category', categorySchema);
module.exports = {Category};