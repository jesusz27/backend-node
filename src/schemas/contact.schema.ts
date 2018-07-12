import mongoose from "mongoose";

const Contact = new mongoose.Schema({
    codUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    codContact: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["SELECTED"], required: true },
});

const ContactSchema = mongoose.model("Contact", Contact);
export default ContactSchema;