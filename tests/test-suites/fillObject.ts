import { fillObject } from "../../src/utils";

const runTests = () => {
  describe("\n   fillObject", () => {
    test("return the defaultObj param if the toFill one is not set", () => {
      const result = fillObject({
        defaultObj: {
          field1: "field-1",
          field2: "field-2",
        },
      });
      expect(result).toStrictEqual({
        field1: "field-1",
        field2: "field-2",
      });
    });
    test("return a filled object, taking missing values inside toFill parameter from default value", () => {
      const result = fillObject({
        toFill: {
          field1: "field-1",
          field2: null,
        },
        defaultObj: {
          field1: "field-1",
          field2: "field-2",
        },
      });
      expect(result).toStrictEqual({
        field1: "field-1",
        field2: "field-2",
      });
    });
  });
};

export default runTests;
