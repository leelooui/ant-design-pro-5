import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Runtime, Inspector } from './lib/runtime';
import SankeyDiagram from './lib/SankeyDiagram';

class SankeyDiagramComponent extends Component<any> {
  state = {};
  componentDidMount() {
    const sankeyDiagram = this.refs.sankeyDiagram;
    const sdom = ReactDOM.findDOMNode(sankeyDiagram);
    const runtime1 = new Runtime();
    runtime1.module(SankeyDiagram, Inspector.into(sdom));
  }
  render() {
    return <div ref="sankeyDiagram" style={{ width: '100%', position: 'absolute', zIndex: 10 }} />;
  }
}

export default SankeyDiagramComponent;
