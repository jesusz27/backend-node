"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = __importDefault(require("./app"));
const socket_1 = __importDefault(require("./socket/socket"));
app_1.default.use(errorhandler_1.default());
const options = {
    pingTimeout: 3000,
    pingInterval: 3000
};
const serve = require("http").Server(app_1.default);
const io = require("socket.io")(serve, options);
const socket = new socket_1.default();
socket.io = io;
socket.loadSocket();
const server = serve.listen(app_1.default.get("port"), () => {
    console.log("  >App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
});
exports.default = server;
//# sourceMappingURL=server.js.map