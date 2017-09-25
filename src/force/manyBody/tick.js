import { quadtree } from "d3-quadtree";
import { TICK } from "../../../../constants/graph";
import jiggle from "../../../../utils/jiggle";
import { x, y } from "../../simulation";
import { initialState } from './index';

export default (state = initialState, action) => {
  if (action.type === TICK) {
    return force(state);
  }

  return state;
};

const force = state => {
  const tree = quadtree(state.nodes, x, y).visitAfter(accumulate(state));

  return {
    ...state,
    nodes: state.nodes.map((node, i) => {
      tree.visit(apply(node, state));

      return node;
    }),
  }
}

const accumulate = (state) => (quad) => {
  var strength = 0, q, c, x, y, i;

  // For internal nodes, accumulate forces from child quadrants.
  if (quad.length) {
    for (x = y = i = 0; i < 4; ++i) {
      if ((q = quad[i]) && (c = q.value)) {
        strength += c, x += c * q.x, y += c * q.y;
      }
    }
    quad.x = x / strength;
    quad.y = y / strength;

    // For leaf nodes, accumulate forces from coincident quadrants.
  } else {
    q = quad;
    q.x = q.data.x;
    q.y = q.data.y;
    do strength += state.manyBodyStrengths[q.data.index];
    while (q = q.next);
  }

  quad.value = strength;
}

const apply = (node, state) => (quad, x1, _, x2) => {
  if (!quad.value) return true;

  var x = quad.x - node.x,
    y = quad.y - node.y,
    w = x2 - x1,
    l = x * x + y * y;

  // Apply the Barnes-Hut approximation if possible.
  // Limit forces for very close nodes; randomize direction if coincident.
  if (w * w / state.theta2 < l) {
    if (l < state.distanceMax2) {
      if (x === 0) x = jiggle(), l += x * x;
      if (y === 0) y = jiggle(), l += y * y;
      if (l < state.distanceMin2) l = Math.sqrt(state.distanceMin2 * l);
      node.vx += x * quad.value * state.alpha / l;
      node.vy += y * quad.value * state.alpha / l;
    }

    return true;
  } else if (quad.length || l >= state.distanceMax2) {
    // Otherwise, process points directly.

    return;
  }

  // Limit forces for very close nodes; randomize direction if coincident.
  if (quad.data !== node || quad.next) {
    if (x === 0) x = jiggle(), l += x * x;
    if (y === 0) y = jiggle(), l += y * y;
    if (l < state.distanceMin2) l = Math.sqrt(state.distanceMin2 * l);
  }

  do if (quad.data !== node) {
    w = state.manyBodyStrengths[quad.data.index] * state.alpha / l;
    node.vx += x * w;
    node.vy += y * w;
  } while (quad = quad.next);
}

