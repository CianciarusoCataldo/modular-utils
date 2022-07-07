/**
 * @file `config` slice initial state file
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { ModularEngineConfigState } from "modular-engine-types";

/**
 * `config` slice initial state (default configuration)
 *
 * @see https://github.com/CianciarusoCataldo/modular-engine/#configuration
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
const defaultConfig: ModularEngineConfigState = {
  appName: "",
};

export default defaultConfig;
