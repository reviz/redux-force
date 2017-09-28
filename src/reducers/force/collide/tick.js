/* eslint-disable no-shadow, no-unused-expressions, consistent-return, no-multi-assign, no-plusplus */
import { quadtree } from "d3-quadtree";
import { TICK } from "../../../constants";
import jiggle from "../../../utils/jiggle";
import { DEFAULT_STRENGTH, initialState } from "./index";
import { x, y } from "../../simulation";

const apply = (node, { radii, strength }) => {
  const xi = x(node);
  const yi = y(node);
  const ri = radii[node.index];
  const ri2 = ri * ri;

  return (quad, x0, y0, x1, y1) => {
    const data = quad.data;
    let rj = quad.r;
    let r = ri + rj;

    if (data) {
      if (data.index > node.index) {
        let x = xi - data.x - data.vx;
        let y = yi - data.y - data.vy;
        let l = x * x + y * y;
        if (l < r * r) {
          if (x === 0) (x = jiggle()), (l += x * x);
          if (y === 0) (y = jiggle()), (l += y * y);
          l = (r - (l = Math.sqrt(l))) / l * strength;

          node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
          node.vy += (y *= l) * r;
          data.vx -= x * (r = 1 - r);
          data.vy -= y * r;
        }
      }

      return;
    }

    return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
  };
};

const prepare = ({ radii }) => quad => {
  if (quad.data) {
    quad.r = radii[quad.data.index];

    return quad.r;
  }
  for (let i = (quad.r = 0); i < 4; ++i) {
    if (quad[i] && quad[i].r > quad.r) {
      quad.r = quad[i].r;
    }
  }
};

const force = state => {
  const tree = quadtree(state.nodes, x, y).visitAfter(prepare(state));

  return {
    ...state,
    nodes: state.nodes.map(node => {
      tree.visit(apply(node, state));

      return node;
    }),
  };
};

export default ({ strength = DEFAULT_STRENGTH } = {}) => (
  state = { ...initialState, strength },
  action
) => {
  if (action.type === TICK) {
    return force(state);
  }

  return state;
};
