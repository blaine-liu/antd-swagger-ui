import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';

import Parameters from '../components/Parameters';
import Response from '../components/Response';
import styles from './path.less';

const ColorMapper = {
  get: 'blue',
  post: 'green',
  put: 'orange',
  delete: 'red'
};

export default
@connect(({ swagger }) => ({
  swagger,
}))
class MethodDashboard extends React.PureComponent {

  render(){
    const { state: { name, method, path } } = this.props.location;
    return (
      <div>
        <div className={styles.header}>
          <Tag color={ColorMapper[name]}>{name.toUpperCase()}</Tag>
          <span>{path}</span>
          <span>{method.summary}</span>
        </div>
        <Divider orientation="left">接口描述</Divider>
        <Table
          pagination={false}
          showHeader={false}
          bordered
          columns={[{
            dataIndex: 'name',
            key: 'name',
          }, {
            dataIndex: 'description',
            key: 'description',
          }]}
          dataSource={[{
            name: '路径',
            description: path,
          }, {
            name: '简介',
            description: method.summary,
          }, {
            name: '描述',
            description: method.description,
          }]}
        />

        <Divider orientation="left">参数列表</Divider>
        <Parameters parameters={method.parameters} />
        <Divider orientation="left">响应列表</Divider>
        <Response responses={method.responses} />
      </div>
    )
  }
}
