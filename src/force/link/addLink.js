import reduceReducers from 'reduce-reducers';
import { ADD_LINK } from "../../../../constants/graph";
import { initialState, defaultStrength, defaultDistance} from './index';
import { counts, biasses, linkStrengths, distances, initializeLink } from './initialize';
import { resetAlpha } from '../../simulation';

export default (strength = defaultStrength, distance = defaultDistance) => (state = initialState, action) => {
  if (action.type === ADD_LINK) {
    return reduceReducers(
      resetAlpha,
      addLink(action.payload),
      counts,
      biasses,
      linkStrengths(strength),
      distances(distance),
    )(state);
  }

  return state;
};

const addLink = link => state => ({
  ...state,
  links: state.links.concat(initializeLink(link, state.links.length)),
});
