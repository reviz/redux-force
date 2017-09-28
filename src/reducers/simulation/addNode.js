import reduceReducers from "reduce-reducers";
import { ADD_NODE } from "../../constants";
import { initialState, resetAlpha } from "./index";
import { initializeNode } from "./initialize";

const addNode = node => state => ({
  ...state,
  nodes: state.nodes.concat(initializeNode(state)(node, state.nodes.length)),
});

export default (state = initialState, action) => {
  if (action.type === ADD_NODE) {
    return reduceReducers(resetAlpha, addNode(action.payload))(state);
  }

  return state;
};
