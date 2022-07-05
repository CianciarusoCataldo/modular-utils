/**
 * @file modular-utils functions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import {
  ModularEngineActionCreator,
  ModularEngineCustomConfig,
  ModularEngineReducer,
  ModularEngineReducerCases,
} from "modular-engine-types";

/**
 * Compute a value using the given callback. If an error occurs, return the default value
 *
 * @param callback
 * @param defaultValue default value to set if errors occurs during computation
 *
 * @returns computed value, or default value
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const computeValue = <T = any>(callback: () => T, defaultValue: T) => {
  let result: T = defaultValue;
  try {
    result = callback();
  } catch {
    result = defaultValue;
  }

  return result;
};

/**
 * Create a standard modular-engine action creator
 *
 * @param type action type
 * @param prepareAction (optional) function to preare the action payload content, if not set an empty payload will be used instead
 *
 * @returns a modular-engine action creator with the given type set
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
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

/**
 * Create a standard modular-engine reducer
 *
 * @param reducerParams optional reducer parameters:
 * - `initialState` : reducer initial state
 * - `internalCases` : a key-value object with all reducer action cases. Every key is the action type related to a case, and the value is a function that
 * receives the actual state and the action, and return the updated state
 * - `customConfig` : reducer custom config
 * - `additionalReducer` : additional reducer to merge to the returned one
 *
 * @returns a modular-engine reducer, ready to be used inside modular-engine system
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const createModularReducer = <T = any>(reducerConfig?: {
  initialState?: T;
  internalCases?: ModularEngineReducerCases<T>;
  customConfig?: ModularEngineCustomConfig<T>;
  additionalReducer?: ModularEngineReducer<T>;
}): ModularEngineReducer<T> => {
  const inputConfig = reducerConfig || {};
  const { initialState, internalCases, customConfig, additionalReducer } = {
    initialState: inputConfig.initialState || ({} as T),
    internalCases: inputConfig.internalCases || {},
    customConfig: inputConfig.customConfig || {},
    additionalReducer:
      inputConfig.additionalReducer || ((state, action) => state),
  };

  let triggers = { ...internalCases };
  customConfig.effects &&
    customConfig.effects.length > 0 &&
    customConfig.effects.forEach((customCase) => {
      triggers[customCase.trigger] = customCase.effect;
    });

  const reducer: ModularEngineReducer<T> = function (state, action) {
    let input = state || initialState;
    if (!action) {
      return input;
    }
    const nextState = triggers[action.type]
      ? triggers[action.type](state, action)
      : input;

    return additionalReducer(nextState, action);
  };

  return reducer;
};

/**
 * Returns a filled object, based on `toFill` parameter, and taking missing values inside toFill parameter from default value
 *
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
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