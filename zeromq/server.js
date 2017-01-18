const zerorpc = require("zerorpc");
const postal = require("node-postal");

const port = process.env.PORT || "4242";
const host = process.env.HOST || "0.0.0.0";

const server = new zerorpc.Server({
  parse: function(text, reply) {

    let parsed = [];
    try {
      parsed = postal.parser.parse_address(text);
      reply(null, parsed);
    } catch (e) {
      reply(e);
    }
  }
});

server.bind(`tcp://${host}:${port}`);
console.log(`Binded to tcp://${host}:${port}`)

server.on("error", function(error) {
  console.error("RPC server error:", error);
  process.exit(0);
});
