const postal = require("node-postal");
const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");
const isEmpty = require("./util/is_empty");

module.exports = (text) => {

  if (isEmpty(text)) {
    return [];
  }

  const parsed = postal.parser.parse_address(text);
  const expandAndParsed = postal.expand.expand_address(text)
    .map(e => postal.parser.parse_address(e));

  expandAndParsed.unshift(parsed);

  return uniqWith(expandAndParsed, isEqual);
};
