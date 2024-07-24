import mongoose from 'mongoose';
import categorySchema from './menu.js'

const restaurantSchema = new mongoose.Schema({
    restaurantId: { type: Number, unique: true },
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: String, required: true },
    image: { type: String, required: true },
    num_of_rating: { type: String, required: true },
    price_for_two: { type: String, required: true },
    menu: [categorySchema]
});

export default  mongoose.model('Restaurant', restaurantSchema);