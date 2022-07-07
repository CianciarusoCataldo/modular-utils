import defaultConfig from "../../src/engine-internal/config/initial-state";

import {
  getAppName,
  getConfig,
} from "../../src/engine-internal/config/selectors";

const runTest = () => {
  const mockState = {
    config: { appName: "test-app" },
  };

  describe("\n   engine-internal", () => {
    test("getAppName", () => {
      const result = getAppName(mockState);

      expect(result).toBe(mockState.config.appName);
    });

    test("getConfig", () => {
      const result = getConfig(mockState);

      expect(result).toBe(mockState.config);

      expect(getConfig({} as any)).toBe(defaultConfig);
    });
  });
};

export default runTest;
