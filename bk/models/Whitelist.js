const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const whitelistSchema = new Schema({
  email: { type: String, unique: true, required: true },
  active: { type: Boolean, default: true },
});

const Whitelist = mongoose.model('Whitelist', whitelistSchema);

module.exports = Whitelist;
