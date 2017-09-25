import reduceReducers from 'reduce-reducers';
import { INITIALIZE } from "../../../constants/graph";
import { initialState } from './index';

export default (state = initialState, action) => {
  if (action.type === INITIALIZE) {
    return reduceReducers(
      initialize,
      nodes,
    )(state);
  }

  return state;
};

export const initializeNode = (state) => (node, i) => {
  const radius = state.initialRadius * Math.sqrt(i);
  const angle = i * state.initialAngle;
  const isVelocityNaN = (isNaN(node.vx) || isNaN(node.vy));
  const isCoordinatesNaN = (isNaN(node.x) || isNaN(node.y));

  return {
    ...node,
    index: i,
    x: isCoordinatesNaN ? radius * Math.cos(angle) : node.x,
    y: isCoordinatesNaN ? radius * Math.sin(angle) : node.y,
    vx: isVelocityNaN ? 0 : node.vx,
    vy: isVelocityNaN ? 0 : node.vy,
  }
};

const initialize = state => ({
  ...state,
  initialized: true,
});

const nodes = state => ({
  ...state,
  nodes: state.nodes.map(initializeNode(state)),
});
