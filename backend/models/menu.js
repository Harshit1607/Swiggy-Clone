import mongoose from "mongoose";
import itemSchema from './item.js'

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [itemSchema]
});

export default categorySchema;