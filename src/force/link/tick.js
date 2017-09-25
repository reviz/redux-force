import { TICK } from "../../../../constants/graph";
import jiggle from "../../../../utils/jiggle";
import { initialState } from './index';

export default (state = initialState, action) => {
  if (action.type === TICK) {
    return force(state);
  }

  return state;
};

const forceFromLink = (state) => (nodes, link, i) => {
  const target = nodes[link.target] || state.nodes[link.target];
  const source = nodes[link.source] || state.nodes[link.source];

  let b;
  let x = target.x + target.vx - source.x - source.vx || jiggle();
  let y = target.y + target.vy - source.y - source.vy || jiggle();

  let l = Math.sqrt(x * x + y * y);
  l = (l - state.distances[i]) / l * state.alpha * state.linkStrengths[i];
  x *= l, y *= l;

  nodes[link.target] = {
    ...target,
    vx: target.vx - (x * (b = state.biasses[i])),
    vy: target.vy - (y * b),
  };
  nodes[link.source] = {
    ...source,
    vx: source.vx + (x * (b = 1 - b)),
    vy: source.vy + (y * b),
  }

  return nodes;
}

const force = (state) => {
  if (!state.initialized) {
    return state
  }

  return {
    ...state,
    nodes: state.links.reduce(forceFromLink(state), state.nodes),
  };
}
