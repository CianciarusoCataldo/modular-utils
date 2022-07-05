import { createModularAction } from "../../src/utils";

const runTests = () => {
  describe("\n   createModularAction", () => {
    test("create a modular-engine action with the given type", () => {
      const resultAction = createModularAction("@@test/action_without_payload");
      expect(resultAction.type).toBe("@@test/action_without_payload");
      expect(resultAction("test-payload").type).toBe(
        "@@test/action_without_payload"
      );
    });
    test("if getPayload is set, create a modular-engine action with the returned object inside payload", () => {
      const resultAction = createModularAction(
        "@@test/action_with_payload",
        (field) => ({ field })
      );
      expect(resultAction("test-payload").payload).toHaveProperty("field");
    });
    test("include match function inside every action creator, to compare modular-engine actions", () => {
      const resultAction = createModularAction("@@test/test_action");
      expect(
        resultAction.match(createModularAction("@@test/test_action"))
      ).toBe(true);
    });

    test("toString method called on a modular-engine action creator returns its type", () => {
      const resultAction = createModularAction("@@test/test_action");
      expect(resultAction.toString()).toBe("@@test/test_action");
    });
  });
};

export default runTests;
