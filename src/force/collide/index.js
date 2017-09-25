import reduceReducers from "reduce-reducers";
import constant from "../../../../utils/constant";
import initialize from "./initialize";
import tick from "./tick";

export const DEFAULT_STRENGTH = 1;

export const initialState = {
  nodes: [],
  radii: [],
  iteration: 1,
  strength: DEFAULT_STRENGTH
};

export default (radius = defaultRadius, strength = DEFAULT_STRENGTH) =>
  (state = { ...initialState, strength }, action) =>
    reduceReducers(initialize(radius), tick(strength));

export const defaultRadius = state => constant(1);
