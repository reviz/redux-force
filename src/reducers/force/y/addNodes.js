import reduceReducers from "reduce-reducers";
import { ADD_NODES } from "../../../constants";
import { yz, yStrengths } from "./initialize";
import { initialState, defaultY, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export default ({ y = defaultY, strength = defaultStrength } = {}) => {
  y = getStateConstant(y);
  strength = getStateConstant(strength);

  return (state = initialState, action) => {
    if (action.type === ADD_NODES) {
      return reduceReducers(yz(y), yStrengths(strength))(state);
    }

    return state;
  };
};
