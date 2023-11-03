import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    nis: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    token: {
      type: String,
      default:'',
    }
  });

  let userModel;
  // fix overwrite user
  if (mongoose.models.Members) {
    userModel = mongoose.model('Members');
  } else {
    userModel = mongoose.model('Members', userSchema);
  }

export default userModel