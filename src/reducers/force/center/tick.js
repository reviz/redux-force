import { TICK } from "../../../constants";
import { initialState } from "./index";

export const force = (state, { x, y }) => {
  let sx = state.nodes.reduce((s, node) => s + node.x, 0);
  let sy = state.nodes.reduce((s, node) => s + node.y, 0);

  return {
    ...state,
    nodes: state.nodes.map(node => {
      sx = sx / state.nodes.length - x;
      sy = sy / state.nodes.length - y;

      return {
        ...node,
        x: node.x - sx,
        y: node.y - sy,
      };
    }),
  };
};

export default ({ x = 0, y = 0 } = {}) => (state = initialState, action) => {
  if (action.type === TICK) {
    return force(state, { x, y });
  }

  return state;
};
