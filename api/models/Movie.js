const mongoose = require("mongoose");

//Esquema de la tabla Movie en Base de datos
const MovieSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  tmdb_id: {type: String, required: true, unique: true},
  vote_average: {type: Number},
  vote_count: {type: Number},
  tagline: {type: String},
  released_date: {type: String},
  runtime: {type: Number},
  genre: {type: Array, required: true},
  director: {type: Array},
  overview: {type: String},
  actors: {type: Array},
  production: {type: Array},
  imgPoster: {type: String, required: true},
  imgFeatured: {type: String, required: true},
  imgTitle: {type: String},
  imgWallpaper: {type: String, required: true},
  trailer_file: {type: String},
  video_file: {type: String, required: true},
  age_classification: {type: Number},
}, {timestamps: true});

module.exports = mongoose.model("Movie", MovieSchema);