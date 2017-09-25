import { TICK } from "../../../constants/graph";
import jiggle from "../../../utils/jiggle";
import { initialState, shouldTick } from './index';

export default (state = initialState, action) => {
  if (action.type === TICK) {
    if (!state.initialized || !shouldTick(state)) {
      return state;
    }

    return alphaDecay(state);
  }

  return state;
};

const alphaDecay = state => ({
  ...state,
  alpha: state.alpha + (state.alphaTarget - state.alpha) * state.alphaDecay,
});
