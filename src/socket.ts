
export default class Socket {

    constructor(serve: any) {
        const io = require("socket.io")(serve);
        this.loadSocket(io);
    }

    private loadSocket(io: any) {
        io.sockets.on("connection", function (socket: any) {

            console.log("CONNECTED KEY: " + socket.id);

            socket.on("probar", function (data: any, response: any) {
                io.sockets.emit("receptor", data);
            });

            socket.on("disconnect", function () {
                console.log("DISCONNECT key: " + socket.id);
            });
        });
    }

}

