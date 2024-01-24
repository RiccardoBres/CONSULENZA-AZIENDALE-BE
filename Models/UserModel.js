const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyModels",
    },
  ],
}, { timestamps: true, strict: true });

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", UserSchema, "Users");
