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
const contact_dao_1 = require("../dao/contact.dao");
const user_resource_1 = require("../resources/user.resource");
class ContactResource {
    constructor() {
        this.contactDao = new contact_dao_1.ContactDao();
        this.userResource = new user_resource_1.UserResource();
    }
    create(contactDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contactDao.create(contactDto);
        });
    }
    /* async findByCodUserAndCodContact(contactInputDto: ContactInputDto): Promise<Contact[]> {
         const topUser: User = await this.userResource.findByIdUser(contactInputDto.codUser);
         const lowerUser: User = await this.userResource.findByIdUser(contactInputDto.codContact);
         return this.contactDao.findByCodUserAndCodContact(topUser, lowerUser);
     }*/
    findByCodUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(idUser);
            return this.contactDao.findByCodUser(user);
        });
    }
    findByCodUserAndStatus(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(idUser);
            return this.contactDao.findByCodUserAndStatus(user);
        });
    }
    update(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contactDao.update(id, status);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contactDao.delete(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.contactDao.findById(id);
        });
    }
}
exports.ContactResource = ContactResource;
//# sourceMappingURL=contact.resource.js.map