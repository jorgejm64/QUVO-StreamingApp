const mongoose = require("mongoose");

//Esquema de la tabla User en Base de datos
const UserSchema = new mongoose.Schema({
  stripe_id: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  acceptTerms: {type: Boolean, required: true},
  username: {type: String, required: true, unique: true},
  subscribed: {type: Boolean, required: true, default: false},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profilePic: {type: String, default: "users/profilePic/defaultProfilePic.jpg"},
  isAdmin: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);