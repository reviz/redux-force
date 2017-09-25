import { TICK } from "../../../../constants/graph";
import { initialState } from './index';

export default (state = initialState, action) => {
  if (action.type === TICK) {
    return force(state);
  }

  return state;
};

export const force = state => ({
  ...state,
  nodes: state.nodes.map((node, i) => ({
    ...node,
    vx: node.vx + ((state.xz[i] - node.x) * state.xStrengths[i] * state.alpha),
  })),
});
