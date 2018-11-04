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
const track_schema_1 = __importDefault(require("../../schemas/track.schema"));
const user_schema_1 = __importDefault(require("../../schemas/user.schema"));
const track_builder_1 = require("../../models/builders/track.builder");
const user_builder_1 = require("../../models/builders/user.builder");
const logger_1 = __importDefault(require("../../util/logger"));
class TrackDao {
    constructor() {
    }
    /*  private static toTrack(document: Document): Track {
          return new TrackBuilder().setId(document.get("_id")).setCodUser(document.get("codUser")).build();
      }*/
    static toTrack(document) {
        return new track_builder_1.TrackBuilder()
            .setId(document.get("_id"))
            .setCodUser(new user_builder_1.UserBuilder(document.get("codUser").get("idUser"))
            .setId(document.get("codUser").get("_id"))
            .setAvatar(document.get("codUser").get("avatar"))
            .build())
            .setCodContact(new user_builder_1.UserBuilder(document.get("codContact").get("idUser"))
            .setId(document.get("codContact").get("_id"))
            .setAvatar(document.get("codContact").get("avatar"))
            .build())
            .setTrackDetail(document.get("trackDetail"))
            .setFecha(document.get("fecha"))
            .build();
    }
    static toArrayContacts(documents) {
        const track = [];
        for (let i = 0; i < documents.length; i++) {
            track.push(TrackDao.toTrack(documents[i]));
        }
        return track;
    }
    create(trackInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = new Date();
            const TrackEntity = new track_builder_1.TrackBuilder().setCodUser(trackInputDto.codUser).setCodContact(trackInputDto.codContact).setTrackDetail(trackInputDto.trackDetail).setFecha(fecha).build();
            const Track = new track_schema_1.default(TrackEntity);
            return Track.save()
                .then((trackDocument) => __awaiter(this, void 0, void 0, function* () {
                const trackPopulate = yield user_schema_1.default.populate(trackDocument, { path: "codUser codContact" });
                const track = trackPopulate ? TrackDao.toTrack(trackPopulate) : undefined;
                return track;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByTrackDetail(trackDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return track_schema_1.default.find({ trackDetail: trackDetail })
                .then((trackDocument) => __awaiter(this, void 0, void 0, function* () {
                const trackPopulate = yield user_schema_1.default.populate(trackDocument, { path: "codUser codContact" });
                const track = trackPopulate ? TrackDao.toArrayContacts(trackPopulate) : undefined;
                return track;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByCodUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return track_schema_1.default.find({ codUser: user })
                .then((trackDocument) => __awaiter(this, void 0, void 0, function* () {
                const trackPopulate = yield user_schema_1.default.populate(trackDocument, { path: "codUser codContact" });
                const track = trackPopulate ? TrackDao.toArrayContacts(trackPopulate) : undefined;
                return track;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByCodContact(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return track_schema_1.default.find({ codContact: user })
                .then((trackDocument) => __awaiter(this, void 0, void 0, function* () {
                const trackPopulate = yield user_schema_1.default.populate(trackDocument, { path: "codUser codContact" });
                const track = trackPopulate ? TrackDao.toArrayContacts(trackPopulate) : undefined;
                return track;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
}
exports.TrackDao = TrackDao;
//# sourceMappingURL=track.dao.js.map