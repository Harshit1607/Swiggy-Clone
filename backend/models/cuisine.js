import mongoose from 'mongoose';

const cuisineSchema = new mongoose.Schema({
  image: { type: String, required: true },
  cuisine: { type: String, required: true }
});

export default  mongoose.model('Cuisine', cuisineSchema);