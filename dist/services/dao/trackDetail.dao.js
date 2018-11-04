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
const trackDetail_schema_1 = __importDefault(require("../../schemas/trackDetail.schema"));
const logger_1 = __importDefault(require("../../util/logger"));
const trackDetail_builder_1 = require("../../models/builders/trackDetail.builder");
const user_dao_1 = require("./user.dao");
class TrackDetailDao {
    constructor() {
        this.userDao = new user_dao_1.UserDao();
    }
    static toTrackDetail(document) {
        return new trackDetail_builder_1.TrackDetailBuilder(document.get("idTrack")).setId(document.get("_id")).setIdTrack(document.get("idTrack")).setLocationStorage(document.get("locationStorage")).build();
    }
    findByIdTrack(idTrack) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield trackDetail_schema_1.default.findOne({ idTrack: idTrack })
                .then((TrackDetailDocument) => {
                const TrackDetail = TrackDetailDocument ? TrackDetailDao.toTrackDetail(TrackDetailDocument) : undefined;
                return TrackDetail;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield trackDetail_schema_1.default.findById(id)
                .then((TrackDetailDocument) => {
                const TrackDetail = TrackDetailDocument ? TrackDetailDao.toTrackDetail(TrackDetailDocument) : undefined;
                return TrackDetail;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    create(trackInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const TrackDetailEntity = new trackDetail_builder_1.TrackDetailBuilder(trackInputDto.idTrack).setLocationStorage("[" + trackInputDto.location + "]").build();
            const TrackDetail = new trackDetail_schema_1.default(TrackDetailEntity);
            return TrackDetail.save()
                .then((trackDetailDocument) => {
                const trackDetail = trackDetailDocument ? TrackDetailDao.toTrackDetail(trackDetailDocument) : undefined;
                return trackDetail;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    update(id, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield trackDetail_schema_1.default.updateOne({ _id: id }, { $set: { locationStorage: location } }, { new: true })
                .then((trackDetailDocument) => {
                console.log("Dao Update");
                // console.log(trackDetailDocument);
                // const trackDetail: TrackDetail = trackDetailDocument ? TrackDetailDao.toTrackDetail(trackDetailDocument) : undefined;
                return trackDetailDocument;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
}
exports.TrackDetailDao = TrackDetailDao;
//# sourceMappingURL=trackDetail.dao.js.map