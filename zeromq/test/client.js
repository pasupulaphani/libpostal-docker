const zerorpc = require("zerorpc");

const client = new zerorpc.Client();

const port = process.env.PORT || "4242";
const host = process.env.HOST || "0.0.0.0";

client.connect(`tcp://${host}:${port}`);
console.log(`Connect to tcp://${host}:${port}`)

client.on("error", function(error) {
  console.error("RPC client error:", error);
});

client.invoke("parse", "test", function(error, res, more) {
  if(error) {
    console.error(error);
  } else {
    console.log("Replied:", res[0].value);
  }

  if(!more) {
    console.log("Done.");
    client.close();
  }
});
