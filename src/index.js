import reduceMergeReducers from "reduce-merge-reducers";
import reduceReducers from "reduce-reducers";
import simulation from "./simulation";
import { forceLink, forceManyBody, forceX, forceY, forceCollide } from "./force";
import velocityDecay from "./velocityDecay";

export default reduceMergeReducers(
  simulation,
  forceLink(),
  forceManyBody(),
  forceX(),
  forceY(),
  velocityDecay()
);
