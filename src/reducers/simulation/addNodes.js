import reduceReducers from "reduce-reducers";
import { ADD_NODES } from "../../constants";
import { initialState, resetAlpha } from "./index";
import { initializeNode } from "./initialize";

const addNodes = nodes => state => ({
  ...state,
  nodes: state.nodes.concat(
    nodes.map((node, i) => initializeNode(state)(node, state.nodes.length + i))
  ),
});

export default (state = initialState, action) => {
  if (action.type === ADD_NODES) {
    return reduceReducers(resetAlpha, addNodes(action.payload))(state);
  }

  return state;
};
