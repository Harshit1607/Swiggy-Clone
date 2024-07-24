import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemId: { type: Number},
  item: { type: String, required: true },
  price: { type: Number, required: true }
});

export default itemSchema;