import reduceReducers from "reduce-reducers";
import { INITIALIZE } from "../../../constants";
import { initialState, defaultY, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export const yz = y => state => ({
  ...state,
  yz: state.nodes.map(y(state)),
});

export const yStrengths = strength => state => ({
  ...state,
  yStrengths: state.nodes.map(
    (node, i, nodes) => (isNaN(state.yz[i]) ? 0 : +strength(state)(node, i, nodes))
  ),
});

export default ({ y = defaultY, strength = defaultStrength } = {}) => {
  y = getStateConstant(y);
  strength = getStateConstant(strength);

  return (state = initialState, action) => {
    if (action.type === INITIALIZE) {
      return reduceReducers(yz(y), yStrengths(strength))(state);
    }

    return state;
  };
};
