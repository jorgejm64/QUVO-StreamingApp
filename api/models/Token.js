const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    user_id: {type: Object, required: true, ref: "users"},
    token: {type: String, required: true},
    createdAt: {Date},
    expiresAt: {Date}
}, {timestamps: true});

module.exports = mongoose.model("Token", TokenSchema);