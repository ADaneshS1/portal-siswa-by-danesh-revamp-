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
    },
    role: {
      // 0: santri/anggota, 1: adalah admin
      type: Number,
      default: 0,
    },
    status: {
      // 0: tidak aktif, sedangkan 1: aktif
      type: Number,
      default: 1,
    },
  });

  let userModel;
  // fix overwrite user
  if (mongoose.models.Userr) {
    userModel = mongoose.model('Userr');
  } else {
    userModel = mongoose.model('Userr', userSchema);
  }

export default userModel