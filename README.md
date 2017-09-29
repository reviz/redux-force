# redux-force

[![Build Status][travis-svg]][travis-url]

Force-directed graph layout for redux.
![graph animation example](example.gif "Graph animation example")
> math & physics credits goes to [d3-force](https://github.com/d3/d3-force)

## Usage

`redux-force`
- **exposes** a set of **specialized reducers** which work together to apply forces to a simulation
- **expose a set of actions** to add `links` and `nodes` and update the simulation
- **does not provide** a graphical representation by default but plays well with `react`

### Reducers

#### `simulation` (main reducer)

- `customInitialState` : (`Object`) - a custom initial state that will be merged with the default initial state

#### Forces

> A force is simply a function that modifies nodes’ positions or velocities; in this context, a force can apply a classical physical force such as electrical charge or gravity, or it can resolve a geometric constraint, such as keeping nodes within a bounding box or keeping linked nodes a fixed distance apart. [...] 
> 
> https://github.com/d3/d3-force#forces

#### `forceCollide`

> Creates a new circle collision force with the specified radius. If radius is not specified, it defaults to the constant one for all nodes.
> 
> https://github.com/d3/d3-force#forceCollide

- `radius` : (`Function|Number`) - a state function invoked on each node to compute the radius `(state) => (node, i, nodes) => i`
- `strength` : (`Number`) - the default strength

#### `forceLink`

> The link force pushes linked nodes together or apart according to the desired link distance. The strength of the force is proportional to the difference between the linked nodes’ distance and the target distance, similar to a spring force
> 
> https://github.com/d3/d3-force#forceLink

- `distance` : (`Function|Number`) - a state function invoked on each link to compute the distance between nodes
- `strength` : (`Function|Number`) - a state function invoked on each node to compute the force of each links

#### `forceManyBody`

> Creates a new many-body force with the default parameters.
> 
> https://github.com/d3/d3-force#forceManyBody

- `strength` : (`Function|Number`) - a state function invoked on each node to compute the force of each nodes

#### `forceX`

> Creates a new positioning force along the x-axis towards the given position x. If x is not specified, it defaults to 0.
> 
> https://github.com/d3/d3-force#forceX

- `x` : (`Function|Number`) - a state function invoked on each node to compute its `x`  position
- `strength` : (`Function|Number`) - a state function invoked on each node to compute its force


#### `forceY`

> Creates a new positioning force along the y-axis towards the given position y. If y is not specified, it defaults to 0.
> 
> https://github.com/d3/d3-force#forceY

- `y` : (`Function|Number`) - a state function invoked on each node to compute its `y`  position
- `strength` : (`Function|Number`) - a state function invoked on each node to compute its force

## Example

1. Setup the reducers:
```
import reduceMergeReducers from "reduce-merge-reducers";
import simulation, { forceLink, ..., velocityDecay } from "redux-force";

export default reduceMergeReducers(
  simulation(), // creates the simulation state first
  forceLink({ distance: 50 }), // then add some or many forces reducers
  ...
  velocityDecay({ velocityDecay: 0.633 }) // finally add the velocity decay
);
```
> see [example/src/reducer.js](example/src/reducer.js) for a full example

2. Choose a graph representation library (`@vx/network`, etc...) and map your `redux-force` data to it:
```
import React, { Component } from "react";
import { connect } from "react-redux";
import { Graph, DefaultLink, DefaultNode } from "@vx/network";
import { getNodes, getLinks } from "redux-force";

class MyGraph extends Component {
  ...
  render() {
    return (
      <svg ...>
        <Graph
          graph={this.props.dataSample}
          linkComponent={DefaultLink}
          nodeComponent={DefaultNode}
        />
      </svg>
    );
  }
}

export default connect(
  state => ({
    dataSample: {
      nodes: getNodes(state),
      links: getLinks(state),
    },
  }),
)(App);
```
> see [example/src/App.js](example/src/App.js) for a full example

3. And dispatch your actions:
```
import React, { Component } from "react";
import { connect } from "react-redux";
import { initialize, tick } from "redux-force";

class MyGraph extends Component {
  componentDidMount() {
    this.props.initialize();
  }

  componentWillUpdate() {
    window.requestAnimationFrame(this.props.tick);
  }
  
  ...
}

export default connect(
  state => ({}),
  {
    initialize,
    tick,
  }
)(App);
```
> see [example/src/reducer.js](example/src/reducer.js) for a full example

## Tests

Simply clone the repo, npm install, and run npm test

[package-url]: https://npmjs.org/package/redux-force
[travis-svg]: https://travis-ci.org/reviz/redux-force.svg
[travis-url]: https://travis-ci.org/reviz/redux-force
