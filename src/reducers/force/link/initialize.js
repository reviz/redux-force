import reduceReducers from "reduce-reducers";
import { INITIALIZE } from "../../../constants";
import { initialState, defaultStrength, defaultDistance } from "./index";
import { findIndexById } from "../../simulation";
import getStateConstant from "../../../utils/getStateConstant";

const updateCountsFromLink = (counts, link) => {
  counts[link.sourceIndex] = (counts[link.sourceIndex] || 0) + 1;
  counts[link.targetIndex] = (counts[link.targetIndex] || 0) + 1;

  return counts;
};

export const counts = state => ({
  ...state,
  counts: state.links.reduce(updateCountsFromLink, []),
});

const updateBiassesFromLink = state => (biasses, link, i) => {
  biasses[i] =
    state.counts[link.sourceIndex] /
    (state.counts[link.sourceIndex] + state.counts[link.targetIndex]);

  return biasses;
};

export const biasses = state => ({
  ...state,
  biasses: state.links.reduce(updateBiassesFromLink(state), []),
});

export const initializeLink = state => (link, i) => ({
  ...link,
  id: link.id || i,
  sourceIndex: findIndexById(state, { id: link.source }),
  targetIndex: findIndexById(state, { id: link.target }),
});

const links = state => ({
  ...state,
  links: state.links.map(initializeLink(state)),
});

export const distances = (distance = defaultDistance) => state => ({
  ...state,
  distances: state.links.map(distance(state)),
});

export const linkStrengths = strength => state => ({
  ...state,
  linkStrengths: state.links.map(strength(state)),
});

export default ({ strength = defaultStrength, distance = defaultDistance } = {}) => {
  strength = getStateConstant(strength);
  distance = getStateConstant(distance);
  return (state = initialState, action) => {
    if (action.type === INITIALIZE) {
      return reduceReducers(links, counts, biasses, linkStrengths(strength), distances(distance))(
        state
      );
    }

    return state;
  };
};
