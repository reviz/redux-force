import { INITIALIZE } from "../../../../constants/graph";
import { initialState, defaultStrength } from './index';

export default (strength = defaultStrength) => (state = initialState, action) => {
  if (action.type === INITIALIZE) {
    return manyBodyStrengths(strength)(state);
  }

  return state;
};

const manyBodyStrengths = strength => state => ({
  ...state,
  manyBodyStrengths: state.nodes.map(strength),
});