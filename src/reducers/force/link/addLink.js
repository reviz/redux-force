import reduceReducers from "reduce-reducers";
import { ADD_LINK } from "../../../constants";
import { initialState, defaultStrength, defaultDistance } from "./index";
import { counts, biasses, linkStrengths, distances, initializeLink } from "./initialize";
import { resetAlpha } from "../../simulation";
import getStateConstant from "../../../utils/getStateConstant";

const addLink = link => state => ({
  ...state,
  links: state.links.concat(initializeLink(state)(link, state.links.length)),
});

export default ({ strength = defaultStrength, distance = defaultDistance } = {}) => {
  strength = getStateConstant(strength);
  distance = getStateConstant(distance);

  return (state = initialState, action) => {
    if (action.type === ADD_LINK) {
      return reduceReducers(
        resetAlpha,
        addLink(action.payload),
        counts,
        biasses,
        linkStrengths(strength),
        distances(distance)
      )(state);
    }

    return state;
  };
};
