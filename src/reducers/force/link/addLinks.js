import reduceReducers from "reduce-reducers";
import { ADD_LINKS } from "../../../constants";
import { initialState, defaultStrength, defaultDistance } from "./index";
import { counts, biasses, linkStrengths, distances, initializeLink } from "./initialize";
import { resetAlpha } from "../../simulation";
import getStateConstant from "../../../utils/getStateConstant";

const addLinks = links => state => ({
  ...state,
  links: state.links.concat(
    links.map((link, i) => initializeLink(state)(link, state.links.length + i))
  ),
});

export default ({ strength = defaultStrength, distance = defaultDistance } = {}) => {
  strength = getStateConstant(strength);
  distance = getStateConstant(distance);

  return (state = initialState, action) => {
    if (action.type === ADD_LINKS) {
      return reduceReducers(
        resetAlpha,
        addLinks(action.payload),
        counts,
        biasses,
        linkStrengths(strength),
        distances(distance)
      )(state);
    }

    return state;
  };
};
