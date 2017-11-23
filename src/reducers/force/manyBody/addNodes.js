import { ADD_NODES } from "../../../constants";
import { manyBodyStrengths } from "./initialize";
import { initialState, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export default ({ strength = defaultStrength } = {}) => {
  strength = getStateConstant(strength);
  return (state = initialState, action) => {
    if (action.type === ADD_NODES) {
      return manyBodyStrengths(strength)(state);
    }

    return state;
  };
};
