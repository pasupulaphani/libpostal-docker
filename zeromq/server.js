const zmq = require("zmq");
const parser = require("node-parser");

const responseder = zmq.socket("rep");
const port = process.env.PORT || "4242";


// Add a callback for the event that is invoked when we receive a message.
responseder.on("message", function (method, text) {
  console.log("Received message: " + message.toString("utf8"));

  return parser[method](text)
});

responseder.bind(`tcp://127.0.0.1:${port}`, function (error) {
  if (error) {
    console.log("Failed to bind socket: " + error.message);
    process.exit(0);
  } else {
    console.log(`Responder bound to port ${port}`);
  }
});
