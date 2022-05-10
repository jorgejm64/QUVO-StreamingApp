//This table (Schema contains all series in our database)

const mongoose = require("mongoose");

//Esquema de la tabla Movie en Base de datos
const SerieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    tmdb_id: {type: String, required: true, unique: true},
    tagline: {type: String},
    vote_average: {type: Number},
    vote_count: {type: Number},
    released_date: {type: String},
    genre: {type: Array, required: true},
    creator: {type: Array},
    overview: {type: String},
    channel: {type: String},
    actors: {type: Array},
    production: {type: Array},
    imgPoster: {type: String, required: true},
    imgFeatured: {type: String, required: true},
    imgTitle: {type: String},
    imgWallpaper: {type: String, required: true},
    trailer_file: {type: String},
    age_classification: {type: Number},
    series_media: {type: Array, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Serie", SerieSchema);