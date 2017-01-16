import zmq from "zmq";

const sock = zmq.socket("pub");
const port = process.ENV.PORT || "4242";

sock.bindSync(`tcp://127.0.0.1:${port}`);
console.log(`Publisher bound to port ${port}`);
