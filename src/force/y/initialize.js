import reduceReducers from 'reduce-reducers';
import { INITIALIZE } from "../../../../constants/graph";
import { initialState, defaultY, defaultStrength } from './index';

export default (y = defaultY, strength = defaultStrength) => (state = initialState, action) => {
  if (action.type === INITIALIZE) {
    return reduceReducers(
      yz(y),
      yStrengths(strength)
    )(state)
  }

  return state;
};

const yz = y => state => ({
  ...state,
  yz: state.nodes.map(y)
});

const yStrengths = strength => state => ({
  ...state,
  yStrengths: state.nodes.map((node, i, nodes) => isNaN(state.yz[i]) ? 0 : +strength(node, i, nodes)),
});