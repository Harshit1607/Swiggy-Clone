import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type : String, required: true},
  phone: {type : Number, required: true},
  email: {type : String, required: true},
  address: {type: String}
})

export default  mongoose.model('User', userSchema);