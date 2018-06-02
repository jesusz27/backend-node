import errorHandler from "errorhandler";

import app from "./app";
import Socket from "./socket";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const serve = require("http").Server(app);
const socket: Socket = new Socket(serve);
const server = serve.listen(app.get("port"), () => {
  console.log(
    "  >App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  >Press CTRL-C to stop\n");
});



export default server;
