import reduceReducers from 'reduce-reducers';
import { INITIALIZE } from "../../../../constants/graph";
import { initialState, defaultStrength, defaultDistance } from './index';

export default (strength = defaultStrength, distance = defaultDistance) => (state = initialState, action) => {
  if (action.type === INITIALIZE) {
    return reduceReducers(
      links,
      counts,
      biasses,
      linkStrengths(strength),
      distances(distance),
    )(state);
  }

  return state;
};

const updateCountsFromLink = (counts, link) => {
  counts[link.source] = (counts[link.source] || 0) + 1
  counts[link.target] = (counts[link.target] || 0) + 1

  return counts;
}

export const counts = state => ({
  ...state,
  counts: state.links.reduce(updateCountsFromLink, []),
});

const updateBiassesFromLink = (state) => (biasses, link, i) => {
  biasses[i] = state.counts[link.source] / (state.counts[link.source] + state.counts[link.target]);

  return biasses;
};

export const biasses = state => ({
  ...state,
  biasses: state.links.reduce(updateBiassesFromLink(state), []),
});

export const initializeLink = (link, i) => ({
  ...link,
  id: link.id || i,
});

const links = state => ({
  ...state,
  links: state.links.map(initializeLink),
});

export const distances = (distance) => (state) => ({
  ...state,
  distances: state.links.map(distance(state)),
});

export const linkStrengths = (strength) => (state) => ({
  ...state,
  linkStrengths: state.links.map(strength(state)),
});