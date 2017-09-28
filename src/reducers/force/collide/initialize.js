import { INITIALIZE } from "../../../constants";
import { initialState, defaultRadius } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export const radii = radius => state => ({
  ...state,
  radii: state.nodes.map(radius(state)),
});

export default ({ radius = defaultRadius } = {}) => (state = initialState, action) => {
  radius = getStateConstant(radius);

  if (action.type === INITIALIZE) {
    return radii(radius)(state);
  }

  return state;
};
