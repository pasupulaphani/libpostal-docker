const assert = require("assert");
const zerorpc = require("zerorpc");

const client = new zerorpc.Client();

const port = process.env.PORT || "4242";
const host = process.env.HOST || "0.0.0.0";

client.connect(`tcp://${host}:${port}`);
console.log(`Connect to tcp://${host}:${port}`)

client.on("error", function(error) {
  console.error("RPC client error:", error);
});


describe('parse', function() {
  const data = {
    input: "the book club, london",
    expected: [
      {"component": "house", "value": "the book club"},
      {"component": "city", "value": "london"}
    ]
  }

  it('should parse address', function(done) {

    client.invoke("parse", data.input, function(error, res, more) {
      if(error) {
        console.error(error);
        throw error;
      } else {
        console.log("Replied:", res);

        assert.deepEqual(res, data.expected);
      }

      if(!more) {
        console.log("Done.");
        done();
      }
    });
  });
});


describe('expand', function() {
  const data = {
    input: "wardour st, uk",
    expected: [ "wardour street uk", "wardour saint uk" ]
  }

  it('should expand address', function(done) {

    client.invoke("expand", data.input, function(error, res, more) {
      if(error) {
        console.error(error);
        throw error;
      } else {
        console.log("Replied:", res);

        assert.deepEqual(res, data.expected);
      }

      if(!more) {
        console.log("Done.");
        done();
      }
    });
  });
});


describe('expandAndParse', function() {
  const data = {
    input: "wardour st, uk",
    expected: [
      {"country": "uk", "road": "wardour st"},
      {"city": "uk", "road": "wardour street"},
      {"house": "wardour saint uk"}
    ]
  }

  it('should expandAndParse address', function(done) {

    client.invoke("expandAndParse", data.input, function(error, res, more) {
      if(error) {
        console.error(error);
        throw error;
      } else {
        console.log("Replied:", res);

        assert.deepEqual(res, data.expected);
      }

      if(!more) {
        console.log("Done.");
        done();
      }
    });
  });
});
