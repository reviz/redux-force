import { INITIALIZE } from "../../../constants";
import { initialState, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export const manyBodyStrengths = strength => state => ({
  ...state,
  manyBodyStrengths: state.nodes.map(strength(state)),
});

export default ({ strength = defaultStrength } = {}) => {
  strength = getStateConstant(strength);
  return (state = initialState, action) => {
    if (action.type === INITIALIZE) {
      return manyBodyStrengths(strength)(state);
    }

    return state;
  };
};
