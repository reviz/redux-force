import { ADD_NODE } from "../../../constants";
import { radii } from "./initialize";
import { initialState, defaultRadius } from "./index";
import getStateConstant from "../../../utils/getStateConstant";

export default ({ radius = defaultRadius } = {}) => {
  radius = getStateConstant(radius);

  return (state = initialState, action) => {
    if (action.type === ADD_NODE) {
      return radii(radius)(state);
    }

    return state;
  };
};
