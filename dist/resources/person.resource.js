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
const person_dao_1 = require("../services/dao/person.dao");
class PersonResource {
    constructor() {
        this.personDao = new person_dao_1.PersonDao();
    }
    create(personInputDto, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personDao.create(personInputDto, idUser);
        });
    }
    update(personInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personDao.update(personInputDto);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personDao.findById(id);
        });
    }
    findByUser(codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personDao.findByUser(codUser);
        });
    }
}
exports.PersonResource = PersonResource;
//# sourceMappingURL=person.resource.js.map