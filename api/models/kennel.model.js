import { Schema, model } from "mongoose";

const kennelSchema = new Schema({
    city: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

export const Kennel = model('Kennel', kennelSchema);