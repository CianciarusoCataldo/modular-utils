import PKG from "../../package.json";

import {} from "../../src/utils";
import computeValueTests from "../test-suites/computeValue";
import createModularActionTests from "../test-suites/createModularAction";
import createModularReducerTests from "../test-suites/createModularReducer";
import fillObjectTests from "../test-suites/fillObject";

describe(`\n        ## Modular-utils v${PKG.version} - unit tests ##        \n`, () => {
  computeValueTests();
  createModularActionTests();
  createModularReducerTests();
  fillObjectTests();
});
