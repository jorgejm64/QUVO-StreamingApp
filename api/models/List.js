const mongoose = require("mongoose");

//Esquema de la tabla List en Base de datos
const ListSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  type: {type: String},
  genre: {type: String},
  content: {type: Array}
}, {timestamps: true});

module.exports = mongoose.model("List", ListSchema);