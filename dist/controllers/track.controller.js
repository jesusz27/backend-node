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
const track_resource_1 = require("../resources/track.resource");
const trackDetail_resource_1 = require("../resources/trackDetail.resource");
const user_resource_1 = require("../resources/user.resource");
class TrackController {
    constructor() {
        this.trackResource = new track_resource_1.TrackResource();
        this.trackDetailResource = new trackDetail_resource_1.TrackDetailResource();
        this.userResource = new user_resource_1.UserResource();
    }
    findByIdTrack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackDetail = yield this.trackDetailResource.findByIdTrack(req.params.idTrack);
            if (trackDetail) {
                const track = yield this.trackResource.findByIdTrack(trackDetail);
                track ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(track) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
            res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
        });
    }
    findByCodUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(req.params.idUser);
            if (user) {
                const track = yield this.trackResource.findByCodUser(user);
                track ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(track) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
            res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
        });
    }
    findByCodContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(req.params.idUser);
            if (user) {
                const track = yield this.trackResource.findByCodContact(user);
                track ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(track) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
            res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
        });
    }
}
exports.TrackController = TrackController;
//# sourceMappingURL=track.controller.js.map