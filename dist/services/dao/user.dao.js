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
const logger_1 = __importDefault(require("../../util/logger"));
const user_schema_1 = __importDefault(require("../../schemas/user.schema"));
const user_builder_1 = require("../../models/builders/user.builder");
class UserDao {
    constructor() {
    }
    static toArrayUsers(documents) {
        const users = [];
        for (let i = 0; i < documents.length; i++) {
            users.push(UserDao.toUser(documents[i]));
        }
        return users;
    }
    static toUser(document) {
        return new user_builder_1.UserBuilder(document.get("idUser")).setId(document.get("_id")).setEmail(document.get("email")).setIdNotification(document.get("idNotification")).setAvatar(document.get("avatar")).build();
    }
    findByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOne({ idUser: idUser })
                .then((userDocument) => {
                const user = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOne({ email: email })
                .then((userDocument) => {
                const user = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByIdNotification(idNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOne({ idNotification: idNotification })
                .then((userDocument) => {
                const user = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.find({})
                .then((usersDocument) => {
                const users = usersDocument ? UserDao.toArrayUsers(usersDocument) : undefined;
                return users;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByIdUserAndPassword(userInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOne({ idUser: userInputDto.idUser, password: userInputDto.password })
                .then((userDocument) => {
                const user = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByIdUserAndIdNotification(userInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOne({ idUser: userInputDto.idUser, idNotification: userInputDto.idNotification })
                .then((userDocument) => {
                const user = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    updateIdNotification(id, idNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOneAndUpdate({ _id: id }, { $set: { idNotification: idNotification } }, { new: true })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                return true;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    updateAvatar(id, avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOneAndUpdate({ _id: id }, { $set: { avatar: avatar } }, { new: true })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                return true;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOneAndUpdate({ _id: id }, { $set: { password: password } }, { new: true })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                return true;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    deleteIdNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOneAndUpdate({ _id: id }, { $unset: { idNotification: 1 } }, { new: true })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                return true;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    create(userInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEntity = new user_builder_1.UserBuilder(userInputDto.idUser).setEmail(userInputDto.email).setPassword(userInputDto.password).setAvatar("uploads/default.png").build();
            const user = new user_schema_1.default(userEntity);
            return user.save()
                .then((userDocument) => {
                const user = userDocument ? UserDao.toUser(userDocument) : undefined;
                return user;
            })
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map