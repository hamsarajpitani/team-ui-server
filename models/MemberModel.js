const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: String,
  userName: { type: String, unique: true },
  avatar: String,
  isActive: Boolean,
  role: String,
  email: { type: String, unique: true },
  teams: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Member', MemberSchema);
