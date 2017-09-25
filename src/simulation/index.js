import reduceReducers from "reduce-reducers";
import initialize from "./initialize";
import addNode from "./addNode";
import tick from "./tick";

const nodess = Array.from(new Array(100)).map((currentValue, index) => {
  return { index, id: index };
});

const links = Array.from(new Array(nodess.length - 1)).map((currentValue, index) => ({
  source: Math.floor(Math.sqrt(index)),
  target: index + 1,
}));

export const ALPHA = 1;
export const ALPHA_MIN = 0.001;

export const initialState = {
  initialized: false,
  alpha: ALPHA,
  alphaMin: ALPHA_MIN,
  alphaDecay: 1 - Math.pow(ALPHA_MIN, 1 / 100),
  alphaTarget: 0,
  links,
  nodes: nodess,
  initialAngle: Math.PI * (3 - Math.sqrt(5)),
  initialRadius: 10,
};

export default reduceReducers(initialize, addNode, tick);

export const resetAlpha = state => ({
  ...state,
  alpha: ALPHA,
});

export const x = node => node.x + node.vx;
export const y = node => node.y + node.vy;
export const getNodes = state => state.nodes;
export const getLinks = state => {
  const links = state.links;
  const nodes = getNodes(state);

  return links.map(link => ({ ...link, source: nodes[link.source], target: nodes[link.target] }));
}

export const find = (state, {x, y, radius}) => {
  var i = 0,
    n = state.nodes.length,
    dx,
    dy,
    d2,
    node,
    closest;

  if (radius === null) radius = Infinity;
  else radius *= radius;

  for (i = 0; i < n; ++i) {
    node = state.nodes[i];
    dx = x - node.x;
    dy = y - node.y;
    d2 = dx * dx + dy * dy;

    if (d2 < radius) closest = node, radius = d2;
  }

  return closest;
};
export const findById = (state, { id }) => state.nodes.find(node => node.id === id);
export const findIndexById = ({ nodes }, { id }) => nodes.findIndex(node => node.id === id);
export const shouldTick = state => state.alpha >= state.alphaMin;
