import reduceMergeReducers from "reduce-merge-reducers";
import simulation, { forceLink, forceManyBody, velocityDecay } from "redux-force";

const nodes = Array.from(new Array(100)).map((currentValue, index) => ({
  index,
  id: index,
}));

const links = Array.from(new Array(nodes.length - 1)).map((currentValue, index) => ({
  source: Math.floor(Math.sqrt(index)),
  target: index + 1,
}));

export default reduceMergeReducers(
  simulation({
    nodes,
    links,
  }),
  forceLink({ distance: 50 }),
  forceManyBody(),
  velocityDecay({ velocityDecay: 0.633 })
);
