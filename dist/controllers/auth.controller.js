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
const user_resource_1 = require("../resources/user.resource");
const converterModelsToDtos_service_1 = require("../services/converterModelsToDtos.service");
const http_messages_enum_1 = require("../util/http-messages.enum");
const token_service_1 = require("../services/token.service");
class AuthController {
    constructor() {
        this.userResource = new user_resource_1.UserResource();
        this.converterModelsToDtosService = new converterModelsToDtos_service_1.ConverterModelsToDtosService();
        this.tokenService = new token_service_1.TokenService();
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = req.body;
            const user = yield this.userResource.findByIdUserAndPassword(userDto);
            const userOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
            if (user) {
                const token = this.tokenService.createToken(user);
                res.setHeader("token", token);
                res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(userOutputDto);
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).json({ message: http_messages_enum_1.HttpMessages.INVALID_USER_OR_PASSWORD });
            }
        });
    }
    singUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = yield this.userResource.findByIdUser(req.body.idUser);
            const email = yield this.userResource.findByEmail(req.body.email);
            if (!idUser && !email) {
                if (req.body.idUser && req.body.email && req.body.password) {
                    const userDto = req.body;
                    const user = yield this.userResource.create(userDto);
                    const userOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
                    user ? res.status(http_status_codes_enum_1.HttpStatusCode.CREATED).json(userOutputDto) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: http_messages_enum_1.HttpMessages.INTERNAL_SERVER_ERROR });
                }
                else {
                    res.status(http_status_codes_enum_1.HttpStatusCode.BAD_REQUEST).json({ message: http_messages_enum_1.HttpMessages.EMPTY_FIELDS });
                }
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.CONFLICT).json({ message: http_messages_enum_1.HttpMessages.EXIST_USER_EMAIL });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map