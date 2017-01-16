import zmq from "zmq";
import libPostalParser from "../libPostalParser"
import logToConsole from "../libPostalParser/util/log_to_console"


const socket = zmq.socket("pull");
const port = process.ENV.PORT || "4242";


// Add a callback for the event that is invoked when we receive a message.
socket.on("message", function (method, text) {
  logToConsole("Received message: " + message.toString("utf8"));

  return libPostalParser[method](text)
});

socket.bindSync(`tcp://127.0.0.1:${port}`, function (error) {
  if (error) {
    logToConsole("Failed to bind socket: " + error.message);
    process.exit(0);
  } else {
    logToConsole(`Responder bound to port ${port}`);
  }
});
