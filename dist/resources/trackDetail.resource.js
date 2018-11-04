"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trackDetail_dao_1 = require("../services/dao/trackDetail.dao");
class TrackDetailResource {
    constructor() {
        this.trackDetailDao = new trackDetail_dao_1.TrackDetailDao();
    }
    create(trackInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.trackDetailDao.create(trackInputDto);
        });
    }
    findByIdTrack(idTrack) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.trackDetailDao.findByIdTrack(idTrack);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.trackDetailDao.findById(id);
        });
    }
}
exports.TrackDetailResource = TrackDetailResource;
//# sourceMappingURL=trackDetail.resource.js.map