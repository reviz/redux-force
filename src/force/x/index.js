import reduceReducers from "reduce-reducers";
import constant from "../../../../utils/constant";
import initialize from "./initialize";
import tick from "./tick";

export const initialState = {
  nodes: [],
  xStrengths: [],
  alpha: 1,
  xz: [],
};

export default (x = defaultX, strength = defaultStrength) => reduceReducers(initialize(x, strength), tick);

export const defaultX = constant(0);
export const defaultStrength = constant(0.1);
