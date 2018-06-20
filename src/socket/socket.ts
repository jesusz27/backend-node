import socketIo from "socket.io";
import { UserSocket } from "../dtos/userSocket.dto";
import { UserDto } from "../dtos/user.dto";
import { LocationDto } from "../dtos/location.dto";
import { TrackInputDto } from "../dtos/trackInput.dto";
import { SocketService } from "../services/socket.service";
import { Contact } from "../models/contact.model";
import async from "async";
export default class Socket {
    public io: any;
    private socketService: SocketService;
    constructor() {
        this.socketService = new SocketService();
    }

    public loadSocket() {
        const userSocketList: UserSocket[] = [];
        const socketService = this.socketService;
        const io = this.io;
        io.sockets.on("connection", function (socket: any) {
            console.log("CONNECTED KEY: " + socket.id);
            socket.on("addUserSocket", function (userDto: UserDto, response: any) {
                console.log("INGRESO USUARIO (" + userDto.idUser + ")");
                const userSocket: UserSocket = { idUser: userDto.idUser, socketId: socket.id };
                userSocketList.push(userSocket);
                console.log(userSocketList);
            });

            socket.on("probar", async function (location: any, response: any) {
                const locationData: LocationDto = JSON.parse(location);
                const userCurrent = findBySocketId(socket.id);
                const track: TrackInputDto = { idTrack: locationData.idTrack, location: location };
                const contact: string[] = await socketService.findByCodContact({ idUser: userCurrent });
                if (contact) {
                    for (let i = 0; i < contact.length; i++) {
                        const contactCurrent = findByCodUser(contact[i]);
                        if (contactCurrent) {
                            io.sockets.connected[contactCurrent].emit("receptor", location);
                        }
                    }
                }
                const contact2: Contact[] = await socketService.findByCodUser({ idUser: userCurrent });
                if (contact2) {
                    const trackDetail: any = await socketService.create(track, contact2);
                    console.log("track detail");
                    console.log(trackDetail);
                }
                response(JSON.stringify(contact));
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
        function findBySocketId(socketId: any) {
            let userCurrent: string = undefined;
            for (let i = 0; i < userSocketList.length; i++) {
                if (userSocketList[i].socketId == socketId) {
                    userCurrent = userSocketList[i].idUser;
                }
            }
            return userCurrent;
        }
        function findByCodUser(codUser: string) {
            let userCurrent = undefined;
            for (let i = 0; i < userSocketList.length; i++) {
                if (userSocketList[i].idUser == codUser) {
                    userCurrent = userSocketList[i].socketId;
                }
            }
            return userCurrent;
        }
    }
}

