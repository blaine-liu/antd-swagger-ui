import React, { Fragment } from 'react';
import { Table, Tag } from 'antd';

export default class Parameters extends React.PureComponent {
  render(){
    const { parameters } = this.props;
    return (
      <Table
        pagination={false}
        bordered
        columns={[{
          dataIndex: 'name',
          title: '名称',
          key: 'name',
          render: (text,record) => {
            return (
              <Fragment>
                <span style={{ marginRight: 12 }}>{text}</span>
                { record.required && <Tag color="#f50">required</Tag> }
              </Fragment>
            )
          }
        }, {
          dataIndex: 'description',
          title: '描述',
          key: 'description',
        }, {
          dataIndex: 'in',
          title: '参数类型',
          key: 'in',
        }, {
          dataIndex: 'type',
          title: '数据类型',
          key: 'type',
        }]}
        dataSource={parameters}
      />
    )
  }
}
