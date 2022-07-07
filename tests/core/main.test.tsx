import PKG from "../../package.json";

import computeValueTests from "../test-suites/computeValue";
import createModularActionTests from "../test-suites/createModularAction";
import createModularReducerTests from "../test-suites/createModularReducer";
import createModularSelectorTests from "../test-suites/createModularSelector";
import engineInternalTests from "../test-suites/engine-internal";
import fillObjectTests from "../test-suites/fillObject";

describe(`\n        ## Modular-utils v${PKG.version} - unit tests ##        \n`, () => {
  computeValueTests();
  createModularActionTests();
  createModularReducerTests();
  createModularSelectorTests();
  fillObjectTests();
  engineInternalTests();
});
