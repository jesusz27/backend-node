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
const http_status_codes_enum_1 = require("../util/http-status-codes.enum");
const trackDetail_resource_1 = require("../resources/trackDetail.resource");
class TrackDetailController {
    constructor() {
        this.trackDetailResource = new trackDetail_resource_1.TrackDetailResource();
    }
    findByIdTrack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackDetail = yield this.trackDetailResource.findByIdTrack(req.params.idTrackDetail);
            trackDetail ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(trackDetail) : res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackDetail = yield this.trackDetailResource.findById(req.params.id);
            trackDetail ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(trackDetail) : res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
        });
    }
}
exports.TrackDetailController = TrackDetailController;
//# sourceMappingURL=trackDetail.controller.js.map