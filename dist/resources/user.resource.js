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
const user_dao_1 = require("../services/dao/user.dao");
class UserResource {
    constructor() {
        this.userDao = new user_dao_1.UserDao();
    }
    create(userInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.create(userInputDto);
        });
    }
    findByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.findByIdUser(idUser);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.findByEmail(email);
        });
    }
    findByIdNotification(idNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.findByIdNotification(idNotification);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.findAll();
        });
    }
    findByIdUserAndPassword(userInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.findByIdUserAndPassword(userInputDto);
        });
    }
    updateIdNotification(id, idNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.updateIdNotification(id, idNotification);
        });
    }
    updateAvatar(id, avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.updateAvatar(id, avatar);
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.updatePassword(id, password);
        });
    }
    deleteIdNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.deleteIdNotification(id);
        });
    }
    findByIdUserAndIdNotification(userInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDao.findByIdUserAndIdNotification(userInputDto);
        });
    }
}
exports.UserResource = UserResource;
//# sourceMappingURL=user.resource.js.map