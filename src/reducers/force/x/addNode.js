import reduceReducers from "reduce-reducers";
import { ADD_NODE } from "../../../constants";
import { xz, xStrengths } from "./initialize";
import { initialState, defaultX, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export default ({ x = defaultX, strength = defaultStrength } = {}) => {
  x = getStateConstant(x);
  strength = getStateConstant(strength);

  return (state = initialState, action) => {
    if (action.type === ADD_NODE) {
      return reduceReducers(xz(x), xStrengths(strength))(state);
    }

    return state;
  };
};
