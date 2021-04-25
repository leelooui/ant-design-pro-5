import React from 'react';
import { Marker, PointLayer } from '@antv/l7-react';
import { Button, Popover } from 'antd';
import { history } from 'umi';

const AMarker: React.FC<any> = (props) => {
  const { list, onDetail } = props;

  const plist = list.map((item: any) => {
    return {
      controlPlan: item.controlPlan,
      centroid: item.lnglat,
      countryName: item.title,
      countryEnglishName: 'Algeria',
      currentConfirmedCount: 1059,
      confirmedCount: 1251,
      suspectedCount: 0,
      curedCount: 62,
      deadCount: 130,
    };
  });
  return (
    <>
      {list.map((item: any, index: number) => (
        <Marker
          key={`m${index}`}
          lnglat={item.lnglat}
          option={{ style: { zIndex: 99999 }, offsets: [0, -5] }}
        >
          {item.controlPlan ? (
            <Popover placement="topLeft" content={item.title} style={{ width: '100%' }}>
              <svg
                onClick={() => {
                  onDetail(item);
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1149"
                width="36"
                height="36"
              >
                <path
                  d="M504.8 84.71c-112.62 0-204.24 91.62-204.24 204.24v328.93c0 112.62 91.62 204.24 204.24 204.24 112.61 0 204.23-91.62 204.24-204.24V288.95c0-112.61-91.62-204.24-204.24-204.24z m0 154.99c41.49 0 75.12 33.63 75.12 75.12s-33.63 75.12-75.12 75.12-75.12-33.63-75.12-75.12c0.01-41.49 33.64-75.12 75.12-75.12z m0 418.07c-55.71 0-100.87-45.16-100.87-100.87s45.16-100.87 100.87-100.87 100.87 45.16 100.87 100.87-45.15 100.87-100.87 100.87z"
                  p-id="1150"
                  fill="#3fae1a"
                ></path>
                <path
                  d="M504.5 928.34h-0.16c-15.15-0.09-27.38-12.45-27.3-27.61l0.6-106.22c0.08-15.11 12.36-27.3 27.46-27.3h0.16c15.15 0.09 27.38 12.45 27.3 27.61l-0.59 106.22c-0.1 15.1-12.37 27.3-27.47 27.3z"
                  p-id="1151"
                  fill="#3fae1a"
                ></path>
                <path
                  d="M681.59 935.5H328.01c-15.15 0-27.46-12.29-27.46-27.46s12.29-27.46 27.46-27.46h353.57c15.15 0 27.46 12.29 27.46 27.46s-12.3 27.46-27.45 27.46z"
                  p-id="1152"
                  fill="#3fae1a"
                ></path>
              </svg>
            </Popover>
          ) : (
            <Popover
              placement="topLeft"
              title={item.title}
              content={
                <Button
                  type="dashed"
                  onClick={() => history.push({ pathname: `/dashboard/timingPlan/${item.id}` })}
                  style={{ width: '100%' }}
                >
                  添加
                </Button>
              }
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7971"
                width="36"
                height="36"
              >
                <path
                  d="M508.5 328.5m-70.28 0a70.28 70.28 0 1 0 140.56 0 70.28 70.28 0 1 0-140.56 0Z"
                  p-id="7972"
                  fill="#5b8ff9"
                ></path>
                <path
                  d="M508.5 554.96m-94.37 0a94.37 94.37 0 1 0 188.74 0 94.37 94.37 0 1 0-188.74 0Z"
                  p-id="7973"
                  fill="#5b8ff9"
                ></path>
                <path
                  d="M508.5 803.08c-105.35 0-191.07-85.71-191.07-191.07V304.3c0-105.35 85.71-191.07 191.07-191.07s191.07 85.71 191.07 191.07v307.72c-0.01 105.35-85.72 191.06-191.07 191.06z m0-638.48c-77.03 0-139.7 62.67-139.7 139.7v307.72c0 77.03 62.67 139.7 139.7 139.7s139.7-62.67 139.7-139.7V304.3c0-77.03-62.67-139.7-139.7-139.7z"
                  p-id="7974"
                  fill="#5b8ff9"
                ></path>
                <path
                  d="M508.22 902.45h-0.15c-14.18-0.08-25.62-11.64-25.54-25.83l0.56-99.37c0.08-14.13 11.56-25.54 25.68-25.54h0.15c14.18 0.08 25.62 11.64 25.54 25.83l-0.56 99.37c-0.08 14.14-11.56 25.54-25.68 25.54z"
                  p-id="7975"
                  fill="#5b8ff9"
                ></path>
                <path
                  d="M673.88 909.15H343.11c-14.18 0-25.68-11.5-25.68-25.68s11.5-25.68 25.68-25.68h330.77c14.18 0 25.68 11.5 25.68 25.68s-11.5 25.68-25.68 25.68z"
                  p-id="7976"
                  fill="#5b8ff9"
                ></path>
              </svg>
            </Popover>
          )}
        </Marker>
      ))}
      <PointLayer
        key="p1"
        source={{
          data: plist.filter((e: any) => e.controlPlan),
          parser: {
            type: 'json',
            coordinates: 'centroid',
          },
        }}
        scale={{
          values: {
            confirmedCount: {
              type: 'log',
            },
          },
        }}
        color={{
          values: '#3fae1a',
        }}
        shape={{
          values: 'circle',
        }}
        active={{
          option: {
            color: '#3fae1a',
          },
        }}
        size={{
          field: 'confirmedCount',
          values: [5, 100],
        }}
        animate={{
          enable: true,
        }}
        style={{
          zIndex: 99999,
          opacity: 0.6,
        }}
      />
      <PointLayer
        key="p2"
        source={{
          data: plist ? plist.filter((e: any) => !e.controlPlan) : [],
          parser: {
            type: 'json',
            coordinates: 'centroid',
          },
        }}
        scale={{
          values: {
            confirmedCount: {
              type: 'log',
            },
          },
        }}
        color={{
          values: '#5b8ff9',
        }}
        shape={{
          values: 'circle',
        }}
        active={{
          option: {
            color: '#5b8ff9',
          },
        }}
        size={{
          field: 'confirmedCount',
          values: [5, 100],
        }}
        animate={{
          enable: true,
        }}
        style={{
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default AMarker;
