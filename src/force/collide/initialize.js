import reduceReducers from 'reduce-reducers';
import { INITIALIZE } from "../../../../constants/graph";
import { initialState, defaultRadius } from './index';

export default (radius = defaultRadius) => (state = initialState, action) => {
  if (action.type === INITIALIZE) {
    return radii(radius)(state);
  }

  return state;
};

const radii = radius => state => ({
  ...state,
  radii: state.nodes.map(radius(state)),
});
