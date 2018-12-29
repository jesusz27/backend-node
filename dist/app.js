"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const expressStatusMonitor = require("express-status-monitor");
const logger_1 = __importDefault(require("./util/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_validator_1 = __importDefault(require("express-validator"));
const secrets_1 = require("./util/secrets");
const main_route_1 = __importDefault(require("./routes/main.route"));
const cors = require("cors");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env" });
// Create Express server
const app = express_1.default();
// Connect to MongoDB
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(secrets_1.MONGODB_URI, { useMongoClient: true })
    .then(() => { logger_1.default.info("  >Conexion establecida con mongoDB."); })
    .catch(err => { logger_1.default.error("  >Error de conexion a la DB. (Posiblemente no tengas mongoDB lanzado en local)" + err); /* process.exit();*/ });
// Express configuration
app.set("port", process.env.PORT || 9095);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_validator_1.default());
app.use(cors());
app.use(morgan_1.default("dev"));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
console.log("path" + path_1.default.join(__dirname, "uploads"));
app.disable("etag");
// app.use(require("express-status-monitor")());
console.log("\n  >Estado del servidor en: http://localhost:9095/status \n");
app.use("/", main_route_1.default);
app.get("/", (req, res) => {
    res.send("funcionandos");
});
exports.default = app;
//# sourceMappingURL=app.js.map