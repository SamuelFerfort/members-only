const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  membership_status: {
    type: String,
    required: true,
    enum: ["regular", "member", "admin"],
  },
  messages: { type: Schema.Types.ObjectId, ref: "Message" },
});

UserSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
