import reduceReducers from "reduce-reducers";
import constant from "../../../../utils/constant";
import initialize from "./initialize";
import addLink from "./addLink";
import tick from "./tick";

export const initialState = {
  initialized: false,
  linkStrengths: [],
  distances: [],
  counts: [],
  biasses: [],
  links: [],
  nodes: [],
};

export default (strength = defaultStrength, distance = defaultDistance) => reduceReducers(initialize(strength, distance), addLink(strength, distance), tick);

export const defaultStrength = state => (link, i, links) => 1 / Math.min(state.counts[link.source], state.counts[link.target]);
export const defaultDistance = state => constant(30);
