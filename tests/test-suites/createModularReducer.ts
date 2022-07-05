import { createModularReducer } from "../../src/utils";

const runTests = () => {
  describe("\n   createModularReducer", () => {
    test("with no params", () => {
      const resultReducer = createModularReducer();
      expect(resultReducer({}, null)).toStrictEqual({});

      expect(resultReducer(null, { type: "@@test/test-action" })).toStrictEqual(
        {}
      );
    });

    test("with all params", () => {
      const resultReducer = createModularReducer({
        initialState: { testField: { extraField: null } },
        internalCases: {
          "@@test/test-action": (state, action) => ({
            ...state,
            testField: action.payload,
          }),
        },
        customConfig: {
          effects: [
            {
              effect: (state, action) => ({
                ...state,
                testField: { extraField: "changed by effect" },
              }),
              trigger: "@@test/test-action-external",
            },
          ],
        },
        additionalReducer: (state, action) => state,
      });

      expect(
        resultReducer(null, {
          type: "@@test/test-action",
          payload: { extraField: "extra-field-by-action" },
        })
      ).toStrictEqual({
        testField: { extraField: "extra-field-by-action" },
      });
    });
  });
};

export default runTests;
