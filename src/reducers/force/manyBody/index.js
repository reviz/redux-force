import reduceReducers from "reduce-reducers";
import stateConstant from "../../../utils/stateConstant";
import initialize from "./initialize";
import addNode from "./addNode";
import addNodes from "./addNodes";
import tick from "./tick";

export const DEFAULT_THETA = 0.9;
export const DEFAULT_DISTANCE_MIN = 1;
export const DEFAULT_DISTANCE_MAX = Infinity;

export const initialState = {
  nodes: [],
  alpha: 1,
  iteration: 1,
  manyBody: {
    distanceMin: DEFAULT_DISTANCE_MIN,
    distanceMax: DEFAULT_DISTANCE_MAX,
    theta: DEFAULT_THETA,
  },
  manyBodyStrengths: [],
};

export const defaultStrength = stateConstant(-30);

export default (
  {
    strength = defaultStrength,
    theta = DEFAULT_THETA,
    distanceMin = DEFAULT_DISTANCE_MIN,
    distanceMax = DEFAULT_DISTANCE_MAX,
  } = {}
) => (
  state = {
    ...initialState,
    manyBody: {
      ...initialState.manyBody,
      theta,
      distanceMin,
      distanceMax,
    },
  },
  action
) =>
  reduceReducers(initialize({ strength }), addNode({ strength }), addNodes({ strength }), tick)(
    state,
    action
  );
