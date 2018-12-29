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
const contact_resource_1 = require("../resources/contact.resource");
const trackDetail_dao_1 = require("../dao/trackDetail.dao");
const track_dao_1 = require("../dao/track.dao");
const oneSignal_service_1 = require("./oneSignal.service");
class SocketService {
    constructor() {
        this.contactResource = new contact_resource_1.ContactResource();
        this.trackDetailDao = new trackDetail_dao_1.TrackDetailDao();
        this.trackDao = new track_dao_1.TrackDao();
        this.oneSignalService = new oneSignal_service_1.OneSignalService();
    }
    findByCodUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.contactResource.findByCodUserAndStatus(idUser);
            return contact;
        });
    }
    findByCodContact(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.contactResource.findByCodUserAndStatus(idUser);
            const contactStr = [];
            for (let i = 0; i < contact.length; i++) {
                contactStr.push(contact[i].getCodContact().getIdUser());
            }
            return contactStr;
        });
    }
    create(trackInput, contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackDetailSearch = yield this.trackDetailDao.findByIdTrack(trackInput.idTrack);
            let trackDetail = undefined;
            if (!trackDetailSearch) {
                trackDetail = yield this.trackDetailDao.create(trackInput);
                this.oneSignalService.sendNotification(contact);
                if (trackDetail) {
                    for (let i = 0; i < contact.length; i++) {
                        const trackInput = { codUser: contact[i].getCodUser(), codContact: contact[i].getCodContact(), trackDetail: trackDetail };
                        this.trackDao.create(trackInput);
                    }
                }
            }
            else {
                const locationBD = JSON.parse(trackDetailSearch.getLocationStorage());
                const location = JSON.parse(trackInput.location);
                locationBD.push(location);
                trackDetail = yield this.trackDetailDao.update(trackDetailSearch.getId(), JSON.stringify(locationBD));
            }
            return JSON.stringify(trackDetail);
        });
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map