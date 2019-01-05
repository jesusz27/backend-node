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
const logger_1 = __importDefault(require("../util/logger"));
class OneSignalService {
    constructor() {
        this.oneSignal = require("onesignal-node");
    }
    sendNotification(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const userNotification = [];
            for (let i = 0; i < contact.length; i++) {
                userNotification.push(contact[i].getCodContact().getIdNotification());
            }
            const myClient = new this.oneSignal.Client({
                userAuthKey: "YzNkMGVhZTMtNzMxMS00ZjRkLTg5YTMtNDNiY2I3NDA0MWM1",
                app: { appAuthKey: "NzJlZjkyZjktYmYzNC00YTYyLWFlYWMtNzUxODY3YmRhZmE2", appId: "50b7df5b-0343-4c20-ae2a-ed518bbaefbb" }
            });
            const firstNotification = new this.oneSignal.Notification({
                contents: {
                    en: "Alerta tienes un contacto en peligro..!",
                    tr: "Test mesajı"
                }
            });
            console.log(userNotification);
            firstNotification.setTargetDevices(userNotification);
            myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
                if (err) {
                    logger_1.default.error("  >Algo salió mal)" + err);
                }
                else {
                    logger_1.default.info("  >CONTACTOS A ENVIAR." + data);
                }
            });
        });
    }
}
exports.OneSignalService = OneSignalService;
//# sourceMappingURL=oneSignal.service.js.map