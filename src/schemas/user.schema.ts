import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const User = new mongoose.Schema({
    idUser: { type: String, required: true },
}, { _id: false });
User.plugin(AutoIncrement);

const UserSchema = mongoose.model("User", User);
export default UserSchema;