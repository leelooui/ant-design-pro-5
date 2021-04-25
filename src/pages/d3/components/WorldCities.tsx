import { Component } from 'react';
import ReactDOM from 'react-dom';
import Globe from 'globe.gl';
import places from './json/4.json';

class PathsLayer extends Component<any> {
  state = {};
  componentDidMount() {
    const globeGl = this.refs.globeGl;
    const gdom = ReactDOM.findDOMNode(globeGl);
    this.createGlobe(gdom);
  }
  createGlobe(dom) {
    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .labelsData(places.features)
      .labelLat((d) => d.properties.latitude)
      .labelLng((d) => d.properties.longitude)
      .labelText((d) => d.properties.name)
      .labelSize((d) => Math.sqrt(d.properties.pop_max) * 4e-4)
      .labelDotRadius((d) => Math.sqrt(d.properties.pop_max) * 4e-4)
      .labelColor(() => 'rgba(255, 165, 0, 0.75)')
      .labelResolution(2)(dom);
  }

  render() {
    return <div ref="globeGl" style={{ width: '100%', position: 'absolute', zIndex: 9 }} />;
  }
}

export default PathsLayer;
