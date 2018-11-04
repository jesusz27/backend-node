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
const user_dao_1 = require("./user.dao");
const contact_schema_1 = __importDefault(require("../../schemas/contact.schema"));
const contact_builder_1 = require("../../models/builders/contact.builder");
const user_schema_1 = __importDefault(require("../../schemas/user.schema"));
const user_builder_1 = require("../../models/builders/user.builder");
const logger_1 = __importDefault(require("../../util/logger"));
class ContactDao {
    constructor() {
        this.userDao = new user_dao_1.UserDao();
    }
    static toContact(document) {
        return new contact_builder_1.ContactBuilder()
            .setId(document.get("_id"))
            .setCodUser(new user_builder_1.UserBuilder(document.get("codUser").get("idUser"))
            .setId(document.get("codUser").get("_id"))
            .build())
            .setCodContact(new user_builder_1.UserBuilder(document.get("codContact").get("idUser"))
            .setId(document.get("codContact").get("_id"))
            .setEmail(document.get("codContact").get("email"))
            .setIdNotification(document.get("codContact").get("idNotification"))
            .setAvatar(document.get("codContact").get("avatar"))
            .build())
            .setStatus(document.get("status"))
            .build();
    }
    static toArrayContacts(documents) {
        const contacts = [];
        for (let i = 0; i < documents.length; i++) {
            contacts.push(ContactDao.toContact(documents[i]));
        }
        return contacts;
    }
    create(contactDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const codUser = yield this.userDao.findByIdUser(contactDto.codUser);
            const codContact = yield this.userDao.findByIdUser(contactDto.codContact);
            if (codUser && codContact) {
                const contact = yield this.findByCodUserAndCodContact(codUser, codContact);
                if (!contact) {
                    const contact = new contact_builder_1.ContactBuilder().setCodUser(new user_builder_1.UserBuilder(codUser.getIdUser()).setId(codUser.getId()).setPassword(codUser.getPassword()).setEmail(codUser.getEmail()).build()).setCodContact(new user_builder_1.UserBuilder(codContact.getIdUser()).setId(codContact.getId()).setPassword(codContact.getPassword()).setEmail(codContact.getEmail()).build()).build();
                    const contactSchema = new contact_schema_1.default(contact);
                    return yield contactSchema.save()
                        .then((contacts) => __awaiter(this, void 0, void 0, function* () {
                        const contactsDocument = yield user_schema_1.default.populate(contacts, { path: "codUser codContact" });
                        if (contactsDocument) {
                            return ContactDao.toContact(contactsDocument);
                        }
                        else {
                            return undefined;
                        }
                    }))
                        .catch(err => {
                        logger_1.default.error(err);
                        return undefined;
                    });
                }
                else {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        });
    }
    findByCodUserAndCodContact(top, lower) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_schema_1.default.findOne({ codUser: top, codContact: lower })
                .then((contactsDocument) => __awaiter(this, void 0, void 0, function* () {
                return contactsDocument;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByCodUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_schema_1.default.find({ codUser: user })
                .then((contactsDocument) => __awaiter(this, void 0, void 0, function* () {
                const contactsPopulate = yield user_schema_1.default.populate(contactsDocument, { path: "codUser codContact" });
                const contacts = contactsPopulate ? ContactDao.toArrayContacts(contactsPopulate) : undefined;
                return contacts;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findByCodUserAndStatus(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_schema_1.default.find({ codUser: user, status: "SELECTED" })
                .then((contactsDocument) => __awaiter(this, void 0, void 0, function* () {
                const contactsPopulate = yield user_schema_1.default.populate(contactsDocument, { path: "codUser codContact" });
                const contacts = contactsPopulate ? ContactDao.toArrayContacts(contactsPopulate) : undefined;
                return contacts;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contact_schema_1.default.findById(id)
                .then((contactDocument) => __awaiter(this, void 0, void 0, function* () {
                const contactPopulate = yield user_schema_1.default.populate(contactDocument, { path: "codUser codContact" });
                const contact = contactPopulate ? ContactDao.toContact(contactPopulate) : undefined;
                return contact;
            }))
                .catch(err => {
                return undefined;
            });
        });
    }
    update(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contact_schema_1.default.findOneAndUpdate({ _id: id }, { $set: { status: status } }, { new: true })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const contact = yield this.findById(id);
                return contact;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_schema_1.default.deleteOne({ _id: id })
                .then(() => {
                return true;
            })
                .catch(err => {
                logger_1.default.error(err);
                return false;
            });
        });
    }
}
exports.ContactDao = ContactDao;
//# sourceMappingURL=contact.dao.js.map