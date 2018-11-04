"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Socket {
    constructor(serve) {
        const io = require("socket.io")(serve);
        this.loadSocket(io);
    }
    loadSocket(io) {
        io.sockets.on("connection", function (socket) {
            console.log("CONNECTED KEY: " + socket.id);
            socket.on("probar", function (data, response) {
                io.sockets.emit("receptor", data);
            });
            socket.on("disconnect", function () {
                console.log("DISCONNECT key: " + socket.id);
            });
        });
    }
}
exports.default = Socket;
//# sourceMappingURL=socket.js.map