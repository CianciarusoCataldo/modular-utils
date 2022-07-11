/**
 * @file modular-utils functions
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

/**
 * Compute a value using the given callback. If an error occurs, return the default value
 *
 * @param callback a function that returns the computed value
 * @param defaultValue default value to set if errors occurs during callback computation
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
