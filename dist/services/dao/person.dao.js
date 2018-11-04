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
const person_builder_1 = require("../../models/builders/person.builder");
const person_schema_1 = __importDefault(require("../../schemas/person.schema"));
const logger_1 = __importDefault(require("../../util/logger"));
const user_dao_1 = require("./user.dao");
const user_builder_1 = require("../../models/builders/user.builder");
class PersonDao {
    constructor() {
        this.userDao = new user_dao_1.UserDao();
    }
    static toArrayPersons(documents) {
        const persons = [];
        for (let i = 0; i < documents.length; i++) {
            persons.push(PersonDao.toPerson(documents[i]));
        }
        return persons;
    }
    static toPerson(document) {
        return new person_builder_1.PersonBuilder().setId(document.get("_id")).setFirstName(document.get("firstName")).setLastName(document.get("lastName")).setBirthdate(document.get("birthdate")).setPhone(document.get("phone"))
            .setUser(new user_builder_1.UserBuilder(document.get("user")[0].get("idUser"))
            .setId(document.get("user")[0].get("_id"))
            .setEmail(document.get("user")[0].get("email"))
            .build())
            .build();
    }
    create(personInputDto, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDao.findByIdUser(idUser);
            const personEntity = new person_builder_1.PersonBuilder().setFirstName(personInputDto.firstName).setLastName(personInputDto.lastName).setBirthdate(personInputDto.birthdate).setPhone(personInputDto.phone).setUser(user).build();
            const person = new person_schema_1.default(personEntity);
            return person.save()
                .then((document) => __awaiter(this, void 0, void 0, function* () {
                const person = yield this.findById(document.get("_id"));
                if (person) {
                    return person;
                }
                else {
                    return undefined;
                }
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield person_schema_1.default.findById(id)
                .then((PersonDocument) => __awaiter(this, void 0, void 0, function* () {
                console.log(PersonDocument);
                const person = PersonDocument ? PersonDao.toPerson(PersonDocument) : undefined;
                return person;
            }))
                .catch(err => {
                return undefined;
            });
        });
    }
    findByUser(codUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield person_schema_1.default.findOne({ user: codUser })
                .then((PersonDocument) => __awaiter(this, void 0, void 0, function* () {
                console.log(PersonDocument);
                const person = PersonDocument ? PersonDao.toPerson(PersonDocument) : undefined;
                return person;
            }))
                .catch(err => {
                return undefined;
            });
        });
    }
    update(personInputDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield person_schema_1.default.findOneAndUpdate({ _id: personInputDto._id }, { $set: { firstName: personInputDto.firstName, lastName: personInputDto.lastName, birthdate: personInputDto.birthdate, phone: personInputDto.phone } }, { new: true })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const person = yield this.findById(personInputDto._id);
                return person;
            }))
                .catch(err => {
                logger_1.default.error(err);
                return undefined;
            });
        });
    }
}
exports.PersonDao = PersonDao;
//# sourceMappingURL=person.dao.js.map