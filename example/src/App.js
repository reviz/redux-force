import "babel-polyfill";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Graph, DefaultLink, DefaultNode } from "@vx/network";
import { getNodes, getLinks, initialize, tick } from "redux-force";

class App extends Component {
  componentDidMount() {
    this.props.initialize();
  }

  componentWillUpdate() {
    window.requestAnimationFrame(this.props.tick);
  }

  get x() {
    return -this.props.width / 2;
  }

  get y() {
    return -this.props.height / 2;
  }

  get viewBox() {
    return `${this.x} ${this.y} ${this.props.width} ${this.props.height}`;
  }

  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} viewBox={this.viewBox}>
          <rect
            x={this.x}
            y={this.y}
            width={this.props.width}
            height={this.props.height}
            rx={14}
            fill="#272b4d"
          />
          <Graph
            graph={this.props.dataSample}
            linkComponent={DefaultLink}
            nodeComponent={DefaultNode}
          />
        </svg>
      </div>
    );
  }
}

export default connect(
  state => ({
    dataSample: {
      nodes: getNodes(state),
      links: getLinks(state),
    },
    width: 800,
    height: 600,
  }),
  {
    initialize,
    tick,
  }
)(App);
