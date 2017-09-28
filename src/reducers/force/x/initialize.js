import reduceReducers from "reduce-reducers";
import { INITIALIZE } from "../../../constants";
import { initialState, defaultX, defaultStrength } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export const xz = x => state => ({
  ...state,
  xz: state.nodes.map(x(state)),
});

export const xStrengths = strength => state => ({
  ...state,
  xStrengths: state.nodes.map(
    (node, i, nodes) => (isNaN(state.xz[i]) ? 0 : +strength(state)(node, i, nodes))
  ),
});

export default ({ x = defaultX, strength = defaultStrength } = {}) => {
  x = getStateConstant(x);
  strength = getStateConstant(strength);

  return (state = initialState, action) => {
    if (action.type === INITIALIZE) {
      return reduceReducers(xz(x), xStrengths(strength))(state);
    }

    return state;
  };
};
