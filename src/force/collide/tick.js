import { quadtree } from "d3-quadtree";
import { TICK } from "../../../../constants/graph";
import jiggle from "../../../../utils/jiggle";
import { DEFAULT_STRENGTH, initialState } from './index';
import { x, y } from "../../simulation";

export default (strength = DEFAULT_STRENGTH) => (state = { ...initialState, strength }, action) => {
  if (action.type === TICK) {
    return force(state);
  }

  return state;
};

const apply = (node, { radii, strength }) => {
  const xi = x(node);
  const yi = y(node);
  const ri = radii[node.index];
  const ri2 = ri * ri;

  return (quad, x0, y0, x1, y1) => {
    var data = quad.data, rj = quad.r, r = ri + rj;

    if (data) {
      if (data.index > node.index) {
        var x = xi - data.x - data.vx,
          y = yi - data.y - data.vy,
          l = x * x + y * y;
        if (l < r * r) {
          if (x === 0) x = jiggle(), l += x * x;
          if (y === 0) y = jiggle(), l += y * y;
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
  }
}

const prepare = ({ nodes, radii }) => (quad) => {
  if (quad.data) return quad.r = radii[quad.data.index];
  for (var i = quad.r = 0; i < 4; ++i) {
    if (quad[i] && quad[i].r > quad.r) {
      quad.r = quad[i].r;
    }
  }
}

const force = (state) => {
  const tree = quadtree(state.nodes, x, y).visitAfter(prepare(state));

  return {
    ...state,
    nodes: state.nodes.map((node, i) => {
      tree.visit(apply(node, state));

      return node;
    }),
  }
};
