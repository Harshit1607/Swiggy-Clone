import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type : Text, required: true},
  phoneNumber: {type : Number, required: true},
  email: {type : Text, required: true},
  address: {type: Text}
})

export default  mongoose.model('User', restaurantSchema);