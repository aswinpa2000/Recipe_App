// Importing Mongoose
const mongoose = require('mongoose');

// connect app to database
mongoose.connect('mongodb+srv://aswinpaanil:Aswinpa2000@cluster0.ddt7wdo.mongodb.net/?retryWrites=true&w=majority');

// creating schema (Structure of the database)

const Schema = mongoose.Schema;

// schema for our app
var recipeSchema = new Schema({
    recipeName : String,
    recipeDuration : String,
    recipeServings : String,
    recipeImage : String,
    recipeType : String
});

var RecipeInfo = mongoose.model('recipes', recipeSchema);
module.exports = RecipeInfo;
