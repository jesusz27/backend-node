import socketIo from "socket.io";
import { ContactResource } from "../resources/contact.resource";
import { UserSocket } from "../dtos/userSocket.dto";
import { UserDto } from "../dtos/user.dto";
import { LocationDto } from "../dtos/location.dto";
export default class Socket {
    private contactResource: ContactResource;
    constructor(serve: any, ) {
        const options = {
            pingTimeout: 3000,
            pingInterval: 3000
        };
        const io = require("socket.io")(serve, options);
        this.loadSocket(io);
        this.contactResource = new ContactResource();
        console.log("entro");
    }

    public loadSocket(io: any) {
        const userSocketList: UserSocket[] = [];
        io.sockets.on("connection", function (socket: any) {
            console.log("CONNECTED KEY: " + socket.id);
            socket.on("addUserSocket", function (userDto: UserDto, response: any) {
                console.log("INGRESO USUARIO (" + userDto.idUser + ")");
                const userSocket: UserSocket = { idUser: userDto.idUser, socketId: socket.id };
                userSocketList.push(userSocket);
                console.log(userSocketList);
            });

            socket.on("probar", function (data: any, response: any) {
                for (let i = 0; i < userSocketList.length; i++) {
                    if (userSocketList[i].idUser == "Jesusz27") {
                        console.log(data);
                        io.sockets.connected[userSocketList[i].socketId].emit("receptor", data);
                    }
                }

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
    }
}

