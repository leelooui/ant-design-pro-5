import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Runtime, Inspector } from './lib/runtime';
import FloatingLandmasses from './lib/FloatingLandmasses';

class map extends Component<any> {
  state = {};
  componentDidMount() {
    const floatingLandmasses = this.refs.floatingLandmasses;
    const fdom = ReactDOM.findDOMNode(floatingLandmasses);
    const runtime = new Runtime();
    runtime.module(FloatingLandmasses, Inspector.into(fdom));
  }
  render() {
    return (
      <div ref="floatingLandmasses" style={{ width: '100%', position: 'absolute', zIndex: 10 }} />
    );
  }
}

export default map;
