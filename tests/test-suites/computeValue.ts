import { computeValue } from "../../src/utils";

const runTests = () => {
  describe("\n   computeValue", () => {
    test("if no errors during callback, return expected value", () => {
      const result = computeValue(() => 5, 4);
      expect(result).toBe(5);
    });
    test("if there are errors during callback, return default value", () => {
      const result = computeValue(() => {
        throw new Error("error during computation");
      }, 4);
      expect(result).toBe(4);
    });
  });
};

export default runTests;
