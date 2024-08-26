import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  addressName: { type: String, required: true },
  address: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: {type : String, required: true},
  phone: {type : Number, required: true},
  email: {type : String, required: true},
  address: { type: [addressSchema], default: [] }, // Array of address objects
})

export default  mongoose.model('User', userSchema);