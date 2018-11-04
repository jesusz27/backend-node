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
const user_model_1 = require("../models/user.model");
const user_resource_1 = require("../resources/user.resource");
const converterModelsToDtos_service_1 = require("../services/converterModelsToDtos.service");
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.userResource = new user_resource_1.UserResource();
        this.converterModelsToDtosService = new converterModelsToDtos_service_1.ConverterModelsToDtosService();
        this.userService = new user_service_1.UserService();
    }
    findByIdUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findByIdUser(req.params.idUser);
            const userOutputDto = this.converterModelsToDtosService.toUserOutputDto(user);
            user ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(userOutputDto) : res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userResource.findAll();
            const userOutputDto = this.converterModelsToDtosService.toArrayUserOutputDto(user);
            user ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(userOutputDto) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        });
    }
    updateIdNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = req.body;
            console.log(req.body);
            const user = yield this.userResource.findByIdUserAndIdNotification(userDto);
            if (!user) {
                const previousUser = yield this.userResource.findByIdNotification(userDto.idNotification);
                if (previousUser)
                    yield this.userResource.deleteIdNotification(previousUser.getId());
                const user = yield this.userResource.findByIdUser(userDto.idUser);
                const userUpdate = yield this.userResource.updateIdNotification(user.getId(), userDto.idNotification);
                user ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(userUpdate) : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.NOT_FOUND).end();
            }
        });
    }
    updateAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.idUser;
            const upload = yield this.userService.uploadAvatar(req);
            const user = yield this.userResource.findByIdUser(idUser);
            console.log(idUser);
            console.log(user);
            if (upload && user_model_1.User) {
                const newUser = yield this.userResource.updateAvatar(user.getId(), upload);
                res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(user);
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = req.body;
            console.log(userDto);
            const user = yield this.userResource.findByIdUserAndPassword(userDto);
            console.log(user);
            if (user) {
                const newPassword = yield this.userResource.updatePassword(user.getId(), userDto.newPassword);
                res.status(http_status_codes_enum_1.HttpStatusCode.OK).json(newPassword);
            }
            else {
                res.status(http_status_codes_enum_1.HttpStatusCode.BAD_REQUEST).end();
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map