import React from 'react';
import { Row, Col } from 'antd';
import Explorer from './Explorer/Explorer';


const Ide = () => (
  <Row type="flex" justify="center" align="top" gutter={2}>
    <Col span={4}>
      <Explorer />
    </Col>
    <Col span={20}>
      <div style={{ backgroundColor: 'blue', height: '100%' }}>我是main</div>
    </Col>
  </Row>
);

export default Ide;
