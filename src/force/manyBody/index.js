import reduceReducers from "reduce-reducers";
import constant from "../../../../utils/constant";
import initialize from "./initialize";
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

export default (strength = defaultStrength) => reduceReducers(initialize(strength), tick);

export const defaultStrength = constant(-30);
