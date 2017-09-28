import { TICK } from "../../constants";
import { initialState, shouldTick } from "./index";

const alphaDecay = state => ({
  ...state,
  alpha: state.alpha + (state.alphaTarget - state.alpha) * state.alphaDecay,
});

export default (state = initialState, action) => {
  if (action.type === TICK) {
    if (!state.initialized || !shouldTick(state)) {
      return state;
    }

    return alphaDecay(state);
  }

  return state;
};
