import reduceReducers from "reduce-reducers";
import stateConstant from "../../../utils/stateConstant";
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

export const defaultStrength = state => link =>
  1 / Math.min(state.counts[link.sourceIndex], state.counts[link.targetIndex]);

export const defaultDistance = stateConstant(30);

export default ({ strength = defaultStrength, distance = defaultDistance } = {}) =>
  reduceReducers(initialize({ strength, distance }), addLink({ strength, distance }), tick);
