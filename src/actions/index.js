import { createAction } from "redux-actions";
import { INITIALIZE, ADD_NODE, TICK, STOP, RESTART, ADD_LINKS, ADD_LINK } from "../constants";

export const initialize = createAction(INITIALIZE);
export const tick = createAction(TICK);
export const stop = createAction(STOP);
export const restart = createAction(RESTART);
export const addLinks = createAction(ADD_LINKS);
export const addNode = createAction(ADD_NODE, payload => payload, (payload, id) => ({ id }));
export const addLink = createAction(ADD_LINK, payload => payload, () => ({}));
