/* eslint-disable no-shadow, no-unused-expressions, no-plusplus, no-restricted-properties */
import reduceReducers from "reduce-reducers";
import initialize from "./initialize";
import addNode from "./addNode";
import addNodes from "./addNodes";
import tick from "./tick";

export const ALPHA = 1;
export const ALPHA_MIN = 0.001;

export const initialState = {
  initialized: false,
  alpha: ALPHA,
  alphaMin: ALPHA_MIN,
  alphaDecay: 1 - Math.pow(ALPHA_MIN, 1 / 100),
  alphaTarget: 0,
  links: [],
  nodes: [],
  initialAngle: Math.PI * (3 - Math.sqrt(5)),
  initialRadius: 10,
};

export const resetAlpha = state => ({
  ...state,
  alpha: ALPHA,
});

export const x = node => node.x + node.vx;
export const y = node => node.y + node.vy;
export const findById = ({ nodes }, { id }) => nodes.find(node => node.id === id);
export const findIndexById = ({ nodes }, { id }) => nodes.findIndex(node => node.id === id);
export const shouldTick = state => state.alpha >= state.alphaMin;
export const getNodes = state => state.nodes;
export const getLinks = state => {
  const links = state.links;
  const nodes = getNodes(state);

  return links.map(link => ({
    ...link,
    source: findById({ nodes }, { id: link.source }),
    target: findById({ nodes }, { id: link.target }),
  }));
};

export const findLinkById = ({ links }, { id }) => links.find(link => link.id === id);
export const findLinkIndexById = ({ links }, { id }) => links.findIndex(link => link.id === id);

export const find = (state, { x, y, radius }) => {
  const n = state.nodes.length;

  let i = 0;
  let dx;
  let dy;
  let d2;
  let node;
  let closest;

  radius = radius === null ? Infinity : radius * radius;

  for (i; i < n; ++i) {
    node = state.nodes[i];
    dx = x - node.x;
    dy = y - node.y;
    d2 = dx * dx + dy * dy;

    if (d2 < radius) (closest = node), (radius = d2);
  }

  return closest;
};

export default (customState = {}) => (state = { ...initialState, ...customState }, action) =>
  reduceReducers(initialize, addNode, addNodes, tick)(state, action);
