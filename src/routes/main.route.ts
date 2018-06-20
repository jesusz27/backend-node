import express from "express";

import dbRoutes from "./db/db.route";
import userRoutes from "./user/user.route";
import contactRoutes from "./contact/contact.route";
import trackRoutes from "./track/track.route";
import trackDetailRoutes from "./track-detail/trackDetail.route";
const api = express.Router();

api.use("/db", dbRoutes);
api.use("/user", userRoutes);
api.use("/contact", contactRoutes);
api.use("/track", trackRoutes);
api.use("/trackDetail", trackDetailRoutes);
export default api;