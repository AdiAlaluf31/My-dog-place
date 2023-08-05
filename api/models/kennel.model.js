import { Schema, model } from "mongoose";

const kennelSchema = new Schema({
    city: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    manager: { type: String },
});

export const Kennel = model('Kennel', kennelSchema);