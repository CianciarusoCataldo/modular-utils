import { createModularSelector } from "../../src/utils";

const runTests = () => {
  describe("\n   createModularSelector", () => {
    test("create a valid moduar-engine selector", () => {
      const resultSelector = createModularSelector(
        (input) => input.test,
        (test) => test
      );
      expect(resultSelector({ test: "test" })).toBe("test");
    });
  });
};

export default runTests;
