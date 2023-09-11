import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' } // Assuming 'User' is the name of your user model
});

const kennelSchema = new Schema({
    name: { type:String, required: true },
    city: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required:true }],
    reviews: [reviewSchema],
});

export const Kennel = model('Kennel', kennelSchema);