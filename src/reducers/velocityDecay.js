/* eslint-disable no-multi-assign, no-unused-expressions */
import { TICK } from "../constants";

export const DEFAULT_VELOCITY_DECAY = 0.6;

export const initialState = {
  nodes: [],
  velocityDecay: DEFAULT_VELOCITY_DECAY,
};

const decay = state => ({
  ...state,
  nodes: state.nodes.map(node => {
    if (node.fx == null) node.x += node.vx *= state.velocityDecay;
    else (node.x = node.fx), (node.vx = 0);
    if (node.fy == null) node.y += node.vy *= state.velocityDecay;
    else (node.y = node.fy), (node.vy = 0);

    return node;
  }),
});

export default ({ velocityDecay = DEFAULT_VELOCITY_DECAY } = {}) => (
  state = { ...initialState, velocityDecay },
  { type }
) => {
  switch (type) {
    case TICK:
      return decay(state);

    default:
      return state;
  }
};
