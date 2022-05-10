//This table (Schema contains all user that has suscribed)

const mongoose = require("mongoose");

//Esquema de la tabla Movie en Base de datos
const SubscriptionSchema = new mongoose.Schema({
  user_id: {type: String, required: true, unique: true},
  initDate: {type: String, required: true},
  outDate: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Subscription", SubscriptionSchema);