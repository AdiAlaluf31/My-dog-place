import { model, Schema } from "mongoose";

const reservationSchema = new Schema({
    dog: { type: Schema.Types.ObjectId, ref: 'Dog', required: true },
    kennel: { type: Schema.Types.ObjectId, ref: 'Kennel', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

export const Reservation = model('Reservation', reservationSchema);