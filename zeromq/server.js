const zerorpc = require("zerorpc");
const addressParser = require("address-parser");

const server = new zerorpc.Server(addressParser);

const port = process.env.PORT || "4242";
server.bind(`tcp://127.0.0.1:${port}`);

server.on("error", function(error) {
  console.error("RPC server error:", error);
  process.exit(0);
});
