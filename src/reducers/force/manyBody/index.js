import reduceReducers from "reduce-reducers";
import stateConstant from "../../../utils/stateConstant";
import initialize from "./initialize";
import addNode from "./addNode";
import addNodes from "./addNodes";
import tick from "./tick";

export const initialState = {
  nodes: [],
  alpha: 1,
  iteration: 1,
  manyBodyStrengths: [],
  distanceMin2: 1,
  distanceMax2: Infinity,
  theta2: 0.81,
};

export const defaultStrength = stateConstant(-30);

export default ({ strength = defaultStrength } = {}) =>
  reduceReducers(initialize({ strength }), addNode({ strength }), addNodes({ strength }), tick);
