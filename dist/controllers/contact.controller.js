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
const contact_resource_1 = require("../resources/contact.resource");
const user_resource_1 = require("../resources/user.resource");
const converterModelsToDtos_service_1 = require("../services/converterModelsToDtos.service");
const http_messages_enum_1 = require("../util/http-messages.enum");
class ContactController {
    constructor() {
        this.contactResource = new contact_resource_1.ContactResource();
        this.userResource = new user_resource_1.UserResource();
        this.converterModelsToDtosService = new converterModelsToDtos_service_1.ConverterModelsToDtosService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactInputDto = req.body;
            const user = yield this.userResource.findByIdUser(contactInputDto.codUser);
            const contacto = yield this.userResource.findByIdUser(contactInputDto.codContact);
            if (user && contacto) {
                if (!(yield this.contactResource.findByCodUserAndCodContact(user, contacto))) {
                    const contact = yield this.contactResource.create(user, contacto);
                    const contactOutputDto = this.converterModelsToDtosService.toContactOutputDto(contact);
                    contact ? res.status(http_status_codes_enum_1.HttpStatusCode.CREATED).json(contactOutputDto) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: http_messages_enum_1.HttpMessages.INTERNAL_SERVER_ERROR });
                }
                else {
                    res.status(http_status_codes_enum_1.HttpStatusCode.CONFLICT).json({ message: http_messages_enum_1.HttpMessages.CONTACT_EXIST });
                }
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).json({ message: http_messages_enum_1.HttpMessages.USER_NOT_FOUND });
            }
        });
    }
    findByCodUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.idUser;
            const user = yield this.userResource.findByIdUser(idUser);
            if (user) {
                const contact = yield this.contactResource.findByCodUser(idUser);
                contact ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(this.converterModelsToDtosService.toArrayContactOutputDto(contact)) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: http_messages_enum_1.HttpMessages.INTERNAL_SERVER_ERROR });
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).json({ message: http_messages_enum_1.HttpMessages.USER_NOT_FOUND });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const status = req.params.status;
            const contact = yield this.contactResource.findById(id);
            if (status == "SELECTED" || status == "UNSELECTED") {
                if (contact) {
                    const contact = yield this.contactResource.update(id, status);
                    const contactOutputDto = this.converterModelsToDtosService.toContactOutputDto(contact);
                    contact ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(contactOutputDto) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: http_messages_enum_1.HttpMessages.INTERNAL_SERVER_ERROR });
                }
                else {
                    res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).json({ message: http_messages_enum_1.HttpMessages.IVALID_IDCONTACT });
                }
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.BAD_REQUEST).json({ message: http_messages_enum_1.HttpMessages.INVALID_STATUS });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const contact = yield this.contactResource.findById(id);
            if (contact) {
                const success = yield this.contactResource.delete(id);
                success ? res.status(http_status_codes_enum_1.HttpStatusCode.NO_CONTENT).json({}) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).json({});
            }
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map