import { Component } from 'react';
import ReactDOM from 'react-dom';
import Globe from 'globe.gl';

class PathsLayer extends Component<any> {
  state = {};
  componentDidMount() {
    const globeGl = this.refs.globeGl;
    const gdom = ReactDOM.findDOMNode(globeGl);
    this.createGlobe(gdom);
  }
  createGlobe(dom) {
    // Gen random data
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    }));

    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color')(dom);
  }
  render() {
    return <div ref="globeGl" style={{ width: '100%', position: 'absolute', zIndex: 9 }} />;
  }
}

export default PathsLayer;
