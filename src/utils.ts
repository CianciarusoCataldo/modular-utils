import {
  ModularEngineActionCreator,
  ModularEngineCustomConfig,
  ModularEngineReducer,
  ModularEngineReducerCases,
} from "modular-engine-types";

export const computeValue = <T = any>(callback: () => T, defaultValue: T) => {
  let result: T = defaultValue;
  try {
    result = callback();
  } catch {
    result = defaultValue;
  }

  return result;
};

export const createModularAction = <
  T extends Record<string, any> = Record<string, any>
>(
  type: string,
  prepareAction?: (...args: any[]) => T
): ModularEngineActionCreator<T> => {
  function actionCreator(...custom) {
    let action = { type, payload: {} as T };
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    action.payload = prepareAction ? prepareAction(...custom) : ({} as T);

    return action;
  }

  actionCreator.toString = function () {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function (action) {
    return action.type === type;
  };

  return actionCreator;
};

export { createSelector as createModularSelector } from "reselect";

export const createModularReducer = <T = any>({
  initialState = {} as T,
  internalCases = {},
  customConfig = {},
  additionalReducer = (state, action) => state,
}: {
  initialState?: T;
  internalCases?: ModularEngineReducerCases<T>;
  customConfig?: ModularEngineCustomConfig<T>;
  additionalReducer?: ModularEngineReducer<T>;
}): ModularEngineReducer<T> => {
  let triggers = { ...internalCases };
  customConfig.effects &&
    customConfig.effects.length > 0 &&
    customConfig.effects.forEach((customCase) => {
      triggers[customCase.trigger] = customCase.effect;
    });

  const reducer: ModularEngineReducer<T> = (state, action) => {
    if (!state) {
      return initialState;
    }
    if (!action) {
      return state;
    }
    const nextState = triggers[action.type]
      ? triggers[action.type](state, action)
      : state;

    return additionalReducer(nextState, action);
  };

  return reducer;
};

export const fillObject = <T = Record<string, any>>({
  defaultObj,
  toFill,
}: {
  toFill?: T;
  defaultObj: T;
}): T => {
  if (!toFill) {
    return defaultObj;
  }

  let result = {};

  Object.keys(defaultObj).forEach((prop) => {
    result[prop] = toFill[prop] || defaultObj[prop];
  });

  return result as T;
};
