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
const socket_service_1 = require("../services/socket.service");
class Socket {
    constructor() {
        this.socketService = new socket_service_1.SocketService();
    }
    loadSocket() {
        const userSocketList = [];
        const socketService = this.socketService;
        const io = this.io;
        io.sockets.on("connection", function (socket) {
            console.log("CONNECTED KEY: " + socket.id);
            socket.on("addUserSocket", function (userDto, response) {
                console.log("INGRESO USUARIO (" + userDto.idUser + ")");
                const userSocket = findByCodUser(userDto.idUser);
                if (userSocket) {
                    userSocket.socketId = socket.id;
                }
                else {
                    const userSocket = { idUser: userDto.idUser, socketId: socket.id };
                    userSocketList.push(userSocket);
                }
                console.log(userSocketList);
            });
            socket.on("startSendingAlerts", function (location, response) {
                return __awaiter(this, void 0, void 0, function* () {
                    const locationData = JSON.parse(location);
                    const userCurrent = findBySocketId(socket.id);
                    const track = { idTrack: locationData.idTrack, location: location };
                    const contact = yield socketService.findByCodContact(userCurrent);
                    if (contact) {
                        for (let i = 0; i < contact.length; i++) {
                            const contactCurrent = findByCodUser(contact[i]);
                            if (contactCurrent) {
                                io.sockets.connected[contactCurrent.socketId].emit("receptorAlerts", location);
                            }
                        }
                        const trackDetail = yield socketService.create(track, userCurrent);
                        console.log("track detail");
                        console.log(trackDetail);
                    }
                    response(JSON.stringify(contact));
                });
            });
            socket.on("disconnect", function () {
                console.log("DISCONNECT key: " + socket.id);
                for (let i = 0; i < userSocketList.length; i++) {
                    if (userSocketList[i].socketId == socket.id) {
                        userSocketList.splice(i, 1);
                    }
                }
            });
        });
        function findBySocketId(socketId) {
            let userCurrent = undefined;
            for (let i = 0; i < userSocketList.length; i++) {
                if (userSocketList[i].socketId == socketId) {
                    userCurrent = userSocketList[i].idUser;
                }
            }
            return userCurrent;
        }
        function findByCodUser(codUser) {
            let userCurrent = undefined;
            for (let i = 0; i < userSocketList.length; i++) {
                if (userSocketList[i].idUser == codUser) {
                    userCurrent = userSocketList[i];
                }
            }
            return userCurrent;
        }
    }
}
exports.default = Socket;
//# sourceMappingURL=socket.js.map