"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const secrets_1 = require("../util/secrets");
const logger_1 = __importDefault(require("../util/logger"));
class DbService {
    constructor() {
        this.yaml = require("js-yaml");
        this.dookie = require("dookie");
        this.mongoose = require("mongoose");
    }
    saveInBackup() {
        return __awaiter(this, void 0, void 0, function* () {
            let success = false;
            yield this.dookie.pull(secrets_1.MONGODB_URI)
                .then((res) => {
                fs_1.default.writeFileSync("./src/config/backupDb.json", res);
                logger_1.default.info("Backup de la DB realizada en: /config/backupDb.json");
                success = true;
            })
                .catch((err) => {
                logger_1.default.error("Error al realizar el backup de la DB. " + err);
            });
            return success;
        });
    }
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            let success = false;
            const contents = fs_1.default.readFileSync("./src/config/test.yml", "utf8");
            const parsed = this.yaml.safeLoad(contents);
            // const backupDb = JSON.parse(fs.readFileSync("../config/backupDb.json", "utf8"));
            yield this.dookie.push(secrets_1.MONGODB_URI, parsed)
                .then(() => {
                logger_1.default.info("DB poblada.");
                success = true;
            })
                .catch((err) => {
                logger_1.default.error("Error al poblar la DB (posiblemente ya este poblada). " + err);
            });
            return success;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = yield new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.mongoose.Promise = Promise;
                    this.mongoose.connect(secrets_1.MONGODB_URI, { useMongoClient: true })
                        .then(() => { logger_1.default.info("  >Conexion establecida con mongoDB."); })
                        .catch((err) => { logger_1.default.error("  >Error de conexion a la DB. (Posiblemente no tengas mongoDB lanzado en local)" + err); });
                    this.mongoose.connection.on("open", () => {
                        this.mongoose.connection.db.dropDatabase()
                            .then(() => {
                            logger_1.default.info("DB borrada con exito.");
                            resolve(true);
                        })
                            .catch((err) => {
                            logger_1.default.error("Error al borrar DB. " + err);
                            resolve(false);
                        });
                    });
                }, 100);
            });
            return promise;
        });
    }
}
exports.DbService = DbService;
//# sourceMappingURL=db.service.js.map