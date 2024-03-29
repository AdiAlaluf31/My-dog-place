import { model, Schema } from "mongoose";

const dogSchema = new Schema({
    name: { type: String },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    isFriendly: { type: Boolean, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Dog = model('Dog', dogSchema);