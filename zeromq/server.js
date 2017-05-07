const zerorpc = require("zerorpc");
const addressParser = require("address-parser");
const debug = require("debug")("libpostal:zeromq");

const port = process.env.PORT || "4242";

const server = new zerorpc.Server({
  parse: function(bytes, reply) {
    const text = new Buffer(bytes).toString('utf8');
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
  expand: function(bytes, reply) {
    const text = new Buffer(bytes).toString('utf8');
    debug("expand: text -", text);

    let expanded = [];
    try {
      expanded = addressParser.expand(text);
      debug("expand: text -", text, ",expanded -", expanded);
      reply(null, expanded);
    } catch (e) {
      debug(e);
      reply(e);
    }
  },
  expandAndParse: function(bytes, reply) {
    const text = new Buffer(bytes).toString('utf8');
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

server.bind(`tcp://0.0.0.0:${port}`);
console.log(`Binded to tcp://0.0.0.0:${port}`)

server.on("error", function(error) {
  console.error("RPC server error:", error);
  process.exit(0);
});
