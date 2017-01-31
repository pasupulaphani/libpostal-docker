module.exports = (obj) => {

  // null and undefined are "empty"
  if (!obj) return true;

  if (typeof obj === "object") {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    if (JSON.stringify(obj) === JSON.stringify({})) {
      return true;
    }
  }

  if (typeof obj === "string" && obj.trim() === "") return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  return false;
};
