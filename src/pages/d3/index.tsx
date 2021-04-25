import { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  CountriesPopulation,
  PathsLayer,
  CablePathsLayer,
  PointsLayer,
  FloatingLandmasses,
  SankeyDiagram,
  WorldCities,
  CustomLayer,
} from './components';

class D3Demo extends Component<any> {
  state = {
    tabActiveKey: 'CustomLayer',
  };
  render() {
    const { tabActiveKey } = this.state;
    return (
      <PageContainer
        title="d3.js"
        tabActiveKey={tabActiveKey}
        onTabChange={(tabActiveKey: string) => {
          this.setState({ tabActiveKey });
        }}
        tabList={[
          {
            tab: 'Custom Layer',
            key: 'CustomLayer',
          },
          {
            tab: 'Floating Landmasses',
            key: 'FloatingLandmasses',
          },
          {
            tab: 'Sankey Diagram',
            key: 'SankeyDiagram',
          },
          {
            tab: 'Paths Layer',
            key: 'PathsLayer',
          },
          {
            tab: 'Points Layer',
            key: 'PointsLayer',
          },
          {
            tab: 'Cable Paths',
            key: 'CablePathsLayer',
          },
          {
            tab: 'Countries Population',
            key: 'CountriesPopulation',
          },
          {
            tab: 'World Cities',
            key: 'WorldCities',
          },
        ]}
      >
        {tabActiveKey === 'SankeyDiagram' && <SankeyDiagram />}
        {tabActiveKey === 'FloatingLandmasses' && <FloatingLandmasses />}
        {tabActiveKey === 'PathsLayer' && <PathsLayer />}
        {tabActiveKey === 'PointsLayer' && <PointsLayer />}
        {tabActiveKey === 'CablePathsLayer' && <CablePathsLayer />}
        {tabActiveKey === 'CountriesPopulation' && <CountriesPopulation />}
        {tabActiveKey === 'WorldCities' && <WorldCities />}
        {tabActiveKey === 'CustomLayer' && <CustomLayer />}
      </PageContainer>
    );
  }
}

export default D3Demo;
