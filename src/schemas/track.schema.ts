import mongoose from "mongoose";

const Track = new mongoose.Schema({
    idTrack: { type: String, required: true },
    codUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    codContact: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trackDetail: { type: mongoose.Schema.Types.ObjectId, ref: "TrackDetail", required: true },
});

const RelationSchema = mongoose.model("Track", Track);
export default RelationSchema;