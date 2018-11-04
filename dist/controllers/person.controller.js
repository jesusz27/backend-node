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
const person_resource_1 = require("../resources/person.resource");
const user_resource_1 = require("../resources/user.resource");
const http_status_codes_enum_1 = require("../util/http-status-codes.enum");
class PersonController {
    constructor() {
        this.userResource = new user_resource_1.UserResource();
        this.personResource = new person_resource_1.PersonResource();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(req.params.idUser);
            if (user) {
                const person = yield this.personResource.findByUser(user.getId());
                if (!person) {
                    const personDto = req.body;
                    const person = yield this.personResource.create(personDto, req.params.idUser);
                    person ? res.status(http_status_codes_enum_1.HttpStatusCode.CREATED).json(person) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
                }
                else {
                    res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
                }
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield this.personResource.findById(req.body._id);
            if (person) {
                const personDto = req.body;
                const person = yield this.personResource.update(personDto);
                person ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(person) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
            }
        });
    }
    findByIdUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(req.params.idUser);
            if (user) {
                const person = yield this.personResource.findByUser(user.getId());
                person ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(person) : res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
            }
        });
    }
}
exports.PersonController = PersonController;
//# sourceMappingURL=person.controller.js.map