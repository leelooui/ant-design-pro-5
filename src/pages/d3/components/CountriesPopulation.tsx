import { Component } from 'react';
import ReactDOM from 'react-dom';
import Globe from 'globe.gl';
import countries from './json/3.json';

class PathsLayer extends Component<any> {
  state = {};
  componentDidMount() {
    const globeGl = this.refs.globeGl;
    const gdom = ReactDOM.findDOMNode(globeGl);
    this.createGlobe(gdom);
  }
  createGlobe(dom) {
    const world = Globe()(dom)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .pointOfView({ altitude: 4 }, 5000)
      .polygonCapColor((feat) => 'rgba(200, 0, 0, 0.6)')
      .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
      .polygonLabel(
        ({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
      `,
      );

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.8;
    world.polygonsData(countries.features.filter((d) => d.properties.ISO_A2 !== 'AQ'));

    setTimeout(
      () =>
        world
          .polygonsTransitionDuration(4000)
          .polygonAltitude((feat) => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5)),
      3000,
    );
  }

  render() {
    return <div ref="globeGl" style={{ width: '100%', position: 'absolute', zIndex: 9 }} />;
  }
}

export default PathsLayer;
