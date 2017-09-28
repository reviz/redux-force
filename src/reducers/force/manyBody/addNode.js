import { ADD_NODE } from "../../../constants";
import { manyBodyStrengths } from "./initialize";
import { initialState, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export default ({ strength = defaultStrength } = {}) => {
  strength = getStateConstant(strength);
  return (state = initialState, action) => {
    if (action.type === ADD_NODE) {
      return manyBodyStrengths(strength)(state);
    }

    return state;
  };
};
