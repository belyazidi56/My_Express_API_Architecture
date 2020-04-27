let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var User = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

//hide password on response JSON
User.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", User);
