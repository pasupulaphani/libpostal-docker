import postal from "node-postal";
import uniqWith from "lodash.uniqwith";
import isEqual from "lodash.isequal";
import isEmpty from "./util/is_empty";

module.exports = (text) => {

  if (isEmpty(text)) {
    return [];
  }

  const parsed = postal.parser.parse_address(text);
  const expandAndParsed = postal.expand.expand_address(text)
    .map(e => postal.parser.parse_address(e));

  expandAndParsed.unshift(parsed);

  return uniqWith(expandAndParsed, isEqual)
    .map(p => p
      .reduce((prev, curr) => {
        prev[curr.component] = curr.value;
        return prev;
      }, {}));
};
