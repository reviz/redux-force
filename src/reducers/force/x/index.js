import reduceReducers from "reduce-reducers";
import stateConstant from "../../../utils/stateConstant";
import initialize from "./initialize";
import addNode from "./addNode";
import tick from "./tick";

export const initialState = {
  nodes: [],
  xStrengths: [],
  alpha: 1,
  xz: [],
};

export const defaultX = stateConstant(0);
export const defaultStrength = stateConstant(0.1);

export default ({ x = defaultX, strength = defaultStrength } = {}) =>
  reduceReducers(initialize({ x, strength }), addNode({ x, strength }), tick);
