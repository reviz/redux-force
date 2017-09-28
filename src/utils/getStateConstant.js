import stateConstant from "./stateConstant";

export default configurationValue =>
  typeof configurationValue === "function" ? configurationValue : stateConstant(configurationValue);
