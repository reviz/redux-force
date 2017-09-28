import reduceReducers from "reduce-reducers";
import stateConstant from "../../../utils/stateConstant";
import initialize from "./initialize";
import addNode from "./addNode";
import tick from "./tick";

export const DEFAULT_STRENGTH = 1;

export const initialState = {
  nodes: [],
  radii: [],
  iteration: 1,
  strength: DEFAULT_STRENGTH,
};

export const defaultRadius = stateConstant(1);

export default ({ radius = defaultRadius, strength = DEFAULT_STRENGTH } = {}) => (
  state = { ...initialState, strength },
  action
) => reduceReducers(initialize({ radius }), addNode({ radius }), tick({ strength }))(state, action);
