const assert = require("assert");
const parse = require("../parse");

describe("parse", () => {

  it("should parse a trained name", () => {

    const name = "ristorante do italy";

    const result = parse(name);
    assert.equal(result[0].value, name);
  });
});
