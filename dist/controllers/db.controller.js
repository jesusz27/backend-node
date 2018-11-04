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
const db_service_1 = require("../services/db.service");
const http_status_codes_enum_1 = require("../util/http-status-codes.enum");
class DbController {
    constructor() {
        this.dbService = new db_service_1.DbService();
    }
    seed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield this.dbService.seed();
            success ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).end() : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        });
    }
    saveInBackup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield this.dbService.saveInBackup();
            success ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).end() : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield this.dbService.delete();
            success ? res.status(http_status_codes_enum_1.HttpStatusCode.OK).end() : res.status(http_status_codes_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        });
    }
}
exports.DbController = DbController;
//# sourceMappingURL=db.controller.js.map