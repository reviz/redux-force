import reduceReducers from "reduce-reducers";
import constant from "../../../../utils/constant";
import initialize from "./initialize";
import tick from "./tick";

export const initialState = {
  nodes: [],
  yStrengths: [],
  alpha: 1,
  yz: [],
};

export default (y = defaultY, strength = defaultStrength) => reduceReducers(initialize(y, strength), tick);

export const defaultY = constant(0);
export const defaultStrength = constant(0.1);
