import { TICK } from "../../../constants";
import { initialState } from "./index";

export const force = state => ({
  ...state,
  nodes: state.nodes.map((node, i) => ({
    ...node,
    vy: node.vy + (state.yz[i] - node.y) * state.yStrengths[i] * state.alpha,
  })),
});

export default (state = initialState, action) => {
  if (action.type === TICK) {
    return force(state);
  }

  return state;
};
