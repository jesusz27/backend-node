import errorHandler from "errorhandler";
import app from "./app";
import Socket from "./socket/socket";

app.use(errorHandler());

const options = {
  pingTimeout: 3000,
  pingInterval: 3000
};
const serve = require("http").Server(app);
const io = require("socket.io")(serve, options);
const socket: Socket = new Socket();
socket.io = io;
socket.loadSocket();
const server = serve.listen(app.get("port"), () => {
  console.log(
    "  >App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});
export default server;
