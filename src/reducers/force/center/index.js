import tick from "./tick";

export const initialState = {
  nodes: [],
};

export default ({ x = 0, y = 0 } = {}) => tick({ x, y });
