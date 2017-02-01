const zerorpc = require("zerorpc");
const addressParser = require("address-parser");
const debug = require("debug")("libpostal:zeromq");

const port = process.env.PORT || "4242";
const host = process.env.HOST || "0.0.0.0";

const server = new zerorpc.Server({
  parse: function(text, reply) {
    debug("parse: text -", text);

    let parsed = [];
    try {
      parsed = addressParser.parse(text);
      debug("parse: text -", text, ",parsed -", parsed);
      reply(null, parsed);
    } catch (e) {
      debug(e);
      reply(e);
    }
  },
  expand: function(text, reply) {
    debug("expand: text -", text);

    let expanded = [];
    try {
      expanded = addressParser.expand(text);
      debug("expand: text -", text, ",expanded -", parsed);
      reply(null, expanded);
    } catch (e) {
      debug(e);
      reply(e);
    }
  },
  expandAndParse: function(text, reply) {
    debug("expandAndParse: text -", text);

    let result = [];
    try {
      result = addressParser.expandAndParse(text);
      debug("expandAndParse: text -", text, ",result -", result);
      reply(null, result);
    } catch (e) {
      debug(e);
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
