import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import morgan from "morgan";
const expressStatusMonitor = require("express-status-monitor");
import logger from "./util/logger";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import api from "./routes/main.route";
const cors = require("cors");

dotenv.config({ path: ".env" });

const app = express();
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true })
  .then(() => { logger.info("  >Conexion establecida con mongoDB."); })
  .catch(err => { logger.error("  >Error de conexion a la DB. (Posiblemente no tengas mongoDB lanzado en local)" + err); });
app.set("port", process.env.PORT || 9095);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.disable("etag");
app.use("/", api);

export default app;