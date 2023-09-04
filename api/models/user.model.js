import mongoose, {Schema} from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        img: {
            type: String,
        },
        city: {
            type: String,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }],
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);