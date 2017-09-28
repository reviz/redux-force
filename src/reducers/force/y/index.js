import reduceReducers from "reduce-reducers";
import stateConstant from "../../../utils/stateConstant";
import initialize from "./initialize";
import addNode from "./addNode";
import tick from "./tick";

export const initialState = {
  nodes: [],
  yStrengths: [],
  alpha: 1,
  yz: [],
};

export const defaultY = stateConstant(0);
export const defaultStrength = stateConstant(0.1);

export default ({ y = defaultY, strength = defaultStrength } = {}) =>
  reduceReducers(initialize({ y, strength }), addNode({ y, strength }), tick);
