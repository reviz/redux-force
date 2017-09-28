# redux-force

[![Build Status][travis-svg]][travis-url]

Force-directed graph layout for redux.
> math & physics credits goes to [d3-force](https://github.com/d3/d3-force)

`redux-force`
- **exposes** a set of **specialized reducers** which work together to apply forces to a simulation
- **expose a set of actions** to add `links` and `nodes` and update the simulation
- **does not provide** a graphical representation by default but plays well with `react`

## Usage

1. Setup the reducers:
```
import reduceMergeReducers from "reduce-merge-reducers";
import simulation, { forceLink, forceManyBody, forceCollide, forceX, forceY, velocityDecay } from "redux-force";

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
