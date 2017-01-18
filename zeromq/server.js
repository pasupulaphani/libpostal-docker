const zerorpc = require("zerorpc");
const addressParser = require("address-parser");

const port = process.env.PORT || "4242";
const host = process.env.HOST || "0.0.0.0";

const server = new zerorpc.Server({
  parse: function(text, reply) {

    let parsed = [];
    try {
      parsed = addressParser.parse(text);
      reply(null, parsed);
    } catch (e) {
      reply(e);
    }
  },
  expand: function(text, reply) {

    let expanded = [];
    try {
      expanded = addressParser.expand(text);
      reply(null, expanded);
    } catch (e) {
      reply(e);
    }
  },
  expandAndParse: function(text, reply) {

    let result = [];
    try {
      result = addressParser.expandAndParse(text);
      reply(null, result);
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
