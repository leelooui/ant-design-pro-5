import { Component } from 'react';
import ReactDOM from 'react-dom';
import Globe from 'globe.gl';
import cablesGeo from './json/2.json';

class PathsLayer extends Component<any> {
  state = {};
  componentDidMount() {
    const globeGl = this.refs.globeGl;
    const gdom = ReactDOM.findDOMNode(globeGl);
    this.createGlobe(gdom);
  }
  createGlobe(dom) {
    const globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')(dom);

    // from https://github.com/telegeography/www.submarinecablemap.com

    let cablePaths = [];
    cablesGeo.features.forEach(({ geometry, properties }) => {
      geometry.coordinates.forEach((coords) => cablePaths.push({ coords, properties }));
    });
    globe
      .pathsData(cablePaths)
      .pathPoints('coords')
      .pathPointLat((p) => p[1])
      .pathPointLng((p) => p[0])
      .pathColor((path) => path.properties.color)
      .pathLabel((path) => path.properties.slug)
      .pathDashLength(0.1)
      .pathDashGap(0.008)
      .pathDashAnimateTime(12000);
  }

  render() {
    return <div ref="globeGl" style={{ width: '100%', position: 'absolute', zIndex: 9 }} />;
  }
}

export default PathsLayer;
