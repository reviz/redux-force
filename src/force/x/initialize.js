import reduceReducers from 'reduce-reducers';
import { INITIALIZE } from "../../../../constants/graph";
import { initialState, defaultX, defaultStrength } from './index';

export default (x = defaultX, strength = defaultStrength) => (state = initialState, action) => {
  if (action.type === INITIALIZE) {
    return reduceReducers(
      xz(x),
      xStrengths(strength)
    )(state)
  }

  return state;
};

const xz = x => state => ({
  ...state,
  xz: state.nodes.map(x)
});

const xStrengths = strength => state => ({
  ...state,
  xStrengths: state.nodes.map((node, i, nodes) => isNaN(state.xz[i]) ? 0 : +strength(node, i, nodes)),
});