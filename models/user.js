const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "Users" }
);
userSchema.set("versionKey", false);

module.exports = mongoose.model("user", userSchema);
