import { Col, Row } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from './model';
import { GridContent } from '@ant-design/pro-layout';
import { AMapScene } from '@antv/l7-react';
import styles from './style.less';
import { ALineLayer, AMarker, Header, BottomCard, RoadMarker } from './components';

interface AmapProps {
  amap: ModalState;
  dispatch: any;
  loading: boolean;
}

const features = [
  {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'MultiLineString',
      coordinates: [
        [
          [112.36054870516062, 28.553379906163393],
          [112.36062917143107, 28.553879372270234],
          [112.36075791746379, 28.554746364414616],
          [112.36090812116862, 28.555674603525006],
          [112.36096176534892, 28.55592904327337],
          [112.36102077394725, 28.55641436182906],
          [112.36113342672587, 28.5571870974366],
          [112.36122462183238, 28.55782789827252],
          [112.36127826601268, 28.558087044561706],
          [112.36131045252085, 28.558346190212948],
          [112.36140701204539, 28.559128335037435],
          [112.36150893598796, 28.559726719021523],
          [112.36157867342234, 28.56019317346873],
          [112.361696690619, 28.560961169721867],
          [112.36188980966807, 28.562219163747397],
          [112.362056106627, 28.563260413346814],
          [112.3621473017335, 28.563976560938478],
          [112.36224922567607, 28.564645589154296],
          [112.36234042078257, 28.56514971323955],
          [112.36237260729075, 28.565385284414155],
          [112.3623994293809, 28.565625566468984],
          [112.36243161588908, 28.565785754200764],
          [112.36245843797923, 28.56609199477404],
          [112.36256572633982, 28.566709184606104],
          [112.36264082819224, 28.567227432814263],
          [112.36268910795451, 28.567528957869996],
          [112.36268910795451, 28.567651452177095],
          [112.36273738771678, 28.56791057427992],
          [112.36276957422496, 28.568132005389486],
          [112.36282858282328, 28.568480640660145],
          [112.36290904909373, 28.56897532385919],
          [112.36293050676585, 28.569074260219914],
        ],
      ],
    },
  },
];
class Amap extends Component<AmapProps> {
  state = {
    markerLnglat: [],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'amap/hideCard',
      payload: {
        cardVisible: true,
      },
    });
    dispatch({
      type: 'amap/fetch',
      payload: {
        count: 5,
      },
    });
  }

  get MarkerProps() {
    const { dispatch } = this.props;
    const { amap } = this.props;
    let { intersections } = amap;
    intersections = intersections || [];
    return {
      list: intersections.map((v: any, index: number) => {
        return {
          controlPlan: v.controlPlan,
          id: index,
          title: v.title,
          lnglat: v.lnglat,
        };
      }),
      onDetail(row: any) {
        dispatch({
          type: 'amap/showDetail',
          payload: row.id,
        });
      },
    };
  }

  get RoadMarkerProps() {
    const { dispatch } = this.props;
    const { markerLnglat } = this.state;
    return {
      lnglat: markerLnglat,
      onAdd() {
        dispatch({
          type: 'amap/showRoadModal',
        });
      },
    };
  }

  get BottomCardProps() {
    const { amap } = this.props;
    const { intersection, equipment, imageList } = amap;
    return {
      intersection,
      equipment,
      imageList,
    };
  }
  get HeaderProps() {
    const { amap } = this.props;
    let { intersections } = amap;
    intersections = intersections || [];
    return {
      count: intersections.length,
      pCount: intersections.filter((e: any) => e.controlPlan).length,
      iCount: intersections.filter((e: any) => !e.controlPlan).length,
    };
  }
  updateMarkerLnglat(markerLnglat: any) {
    this.setState({ markerLnglat });
  }

  render() {
    const { dispatch, amap } = this.props;
    const { cardVisible } = amap;
    const { HeaderProps, MarkerProps, RoadMarkerProps, BottomCardProps } = this;

    return (
      <GridContent style={{ width: 'calc(100% + 48px)', margin: '-24px' }}>
        <React.Fragment>
          <Row gutter={24} style={{ margin: 0, padding: 0 }}>
            <Col span={24} style={{ margin: 0, padding: 0 }} className={styles.amap}>
              <AMapScene
                map={{
                  resizeEnable: true,
                  center: [112.36229441821575, 28.56552675407389],
                  pitch: 45,
                  style: 'dark',
                  zoom: 6,
                  plugin: ['AMap.ElasticMarker', 'AMap.Weather'],
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onSceneLoaded={({ map }) => {
                  map.on('dblclick', (msg: any) => {
                    console.info([msg.lnglat.R, msg.lnglat.Q]);
                    this.updateMarkerLnglat([msg.lnglat.R, msg.lnglat.Q]);
                  });
                  map.on('click', () => {
                    dispatch({
                      type: 'amap/hideCard',
                      payload: {
                        cardVisible: true,
                      },
                    });
                  });
                }}
              >
                <Header {...HeaderProps} />
                <ALineLayer features={features} />
                <AMarker {...MarkerProps} />
                <RoadMarker {...RoadMarkerProps} />
              </AMapScene>
              {cardVisible ? <BottomCard {...BottomCardProps} /> : <></>}
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    amap,
    loading,
  }: {
    amap: ModalState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    amap,
    loading: loading.models.amap,
  }),
)(Amap);
