import { createModularReducer } from "../../src/utils";

const runTests = () => {
  describe("\n   createModularReducer", () => {
    test("with no params", () => {
      const resultReducer = createModularReducer();

      /* eslint-disable */
      expect(resultReducer({}, null as any)).toStrictEqual({});

      expect(resultReducer(null, { type: "@@test/test-action" })).toStrictEqual(
        {}
      );
    });

    test("with all params", () => {
      const resultReducer = createModularReducer<{ testField: any } | null>({
        initialState: { testField: { extraField: null } },
        effects: {
          "@@test/test-action": (state, action) => ({
            ...state,
            testField: action.payload,
          }),
          "@@test/test-action-external": (state, action) => ({
            ...state,
            testField: { extraField: "changed by effect" },
          }),
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
