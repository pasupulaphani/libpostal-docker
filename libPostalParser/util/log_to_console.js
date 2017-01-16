// Just a helper function for logging to the console with a timestamp.
module.exports  = function logToConsole (message) {
  console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}
