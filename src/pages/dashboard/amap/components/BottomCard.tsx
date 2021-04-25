
import React from 'react'
import styles from './BottomCard.less'
import { Card, Row, Col, Image } from 'antd'
import ProDescriptions from '@ant-design/pro-descriptions';

const { Meta } = Card;
const intImportanceLevelEnum = { '1': '高', '2': '中', '3': '低' }
const intIntersectionLatitudeEnum = { '1': 'T字型', '2': '十字型' }
const intTrafficSituationEnum = { '1': '拥堵', '2': '畅通' }

const BottomCard: React.FC<any> = (props) => {

    const { intersection, equipment, imageList } = props

    /*
      eastNumber 东方向数目
      equipmentType 路口设施设备类型
      intersectionId	路口ID
      northNumber 北方向数目
      southNumber	 南方向数目
      westNumber 西方向数目 
      */
    let detail = { b2: intersection.scBrand }
    let ecolumns = [{ title: '信号灯型号', key: 'text', dataIndex: 'b1', }, { title: '信控机机型', key: 'text', dataIndex: 'b2', }]
    equipment.forEach((item: any, index: number) => {
        ecolumns.push({ title: item.equipmentType, key: 'text', dataIndex: `a${index}`, 'span': '24' })
        detail[`a${index}`] = `北（${item.northNumber}）南（${item.southNumber}）东（${item.eastNumber}）西（${item.westNumber}）`
    });
    return (
        <Row gutter={16} className={styles.RowBox}>
            <Col span={8} style={{ paddingRight: '0px!important' }}>
                <Card className={styles.Card}>
                    <ProDescriptions
                        title={`${intersection.intIntersectionName}（${intersection.intIntersectionCode}）`}
                        dataSource={intersection}
                        column={2}
                        columns={[
                            {
                                title: '路口渠化图',
                                key: 'text',
                                dataIndex: 'a1',
                                render: () => '查看'
                            },
                            {
                                title: '重要程度',
                                key: 'text',
                                dataIndex: 'intImportanceLevel',
                                render: () => { return intImportanceLevelEnum[intersection.intImportanceLevel] }
                            },
                            {
                                title: '路口形状',
                                key: 'text',
                                dataIndex: 'intIntersectionShape',
                                render: () => { return intIntersectionLatitudeEnum[intersection.intIntersectionShape] }
                            },
                            {
                                title: '交通状态',
                                key: 'text',
                                dataIndex: 'intTrafficSituation',
                                render: () => {
                                    return intTrafficSituationEnum[intersection.intTrafficSituation]
                                }
                            },
                            {
                                title: '是否联网',
                                key: 'text',
                                dataIndex: 'a5',
                            },
                            {
                                title: '是否被制高点覆盖',
                                key: 'text',
                                dataIndex: 'commandingHeight',
                            },
                            {
                                title: '路口位置',
                                key: 'text',
                                dataIndex: 'latitudeLongitude',
                                span: 24,
                                render: () => {
                                    return `纬度${intersection.intIntersectionLatitude}，经度${intersection.intIntersectionLongitude}`
                                }
                            },
                            {
                                title: '路口描述',
                                key: 'text',
                                dataIndex: 'intIntersectionDescription',
                                span: 24
                            },
                            {
                                title: '操作',
                                valueType: 'option',
                                render: () => [
                                    <img style={{ width: '36px', height: '36px', transform: 'rotate(-90deg)' }} src="./uu.png"></img>,
                                    <span>信控方案</span>,
                                ],
                            },
                        ]}
                    >
                    </ProDescriptions>
                </Card>
            </Col>
            <Col span={8} style={{ paddingRight: '0px!important' }}>
                <Card className={styles.Card}>
                    <ProDescriptions
                        title="设施设备管理"
                        dataSource={detail}
                        column={2}
                        columns={ecolumns}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card className={styles.Card}>
                    <p>路口图片集</p>
                    {imageList && imageList.map((e: any,index: number) =>
                        <Card
                            key={index}
                            bordered={false}
                            hoverable
                            style={{ width: 220 }}
                            cover={<Image preview={e.filePath} src={e.filePath} />}
                        >
                            <Meta title="渠化图" />
                        </Card>
                    )}
                </Card>
            </Col>
        </Row>
    )
}

export default BottomCard
