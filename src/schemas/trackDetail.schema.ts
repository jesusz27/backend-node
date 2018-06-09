import mongoose from "mongoose";

const TrackDetail = new mongoose.Schema({
    idTrack: { type: String, required: true },
    locationStorage: { type: String, required: true },
});

const RelationSchema = mongoose.model("TrackDetail", TrackDetail);
export default RelationSchema;