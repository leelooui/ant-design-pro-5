import React from 'react';
import { Marker } from '@antv/l7-react';
import { Button } from 'antd';

const RoadMarker: React.FC<any> = (props) => {
  const { lnglat, onAdd } = props;
  if (lnglat && lnglat.length === 0) return <div />;
  return (
    <Marker lnglat={lnglat}>
      <Button
        ghost
        type="dashed"
        style={{ borderColor: '#24b864', color: '#24b864' }}
        onClick={onAdd}
      >
        添加
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          alt="marker"
          src="https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*JhBbT4LvHpQAAAAAAAAAAAAAARQnAQ"
          style={{
            width: '20px',
            height: '30px',
          }}
        />
      </div>
    </Marker>
  );
};

export default RoadMarker;
