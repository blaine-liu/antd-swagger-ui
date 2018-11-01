import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import Model from './Model';

export default
@connect(({ swagger }) => ({
  swagger,
}))
class Response extends React.PureComponent {

  getDefinitionModel = (schema) => {
    if (!schema) return;
    const { swagger: { apiData } } = this.props;
    const { type } = schema;
    // 获取数组类型的响应
    if (type && type === 'array') {
      if (schema.items) {
        const $ref = schema.items.$ref;
        const modelPath = splitPath($ref);
        return resovleDefinitions(modelPath);
      }
    }
    if (!type && schema.$ref) {
      return resovleDefinitions(splitPath(schema.$ref));
    }

    function splitPath($ref){
      return $ref.replace('#/definitions/', '').split('/');
    }

    function resovleDefinitions(modelPath) {
      let index = 0;
      let models = apiData.definitions || {};
      while (index < modelPath.length) {
        models = models[modelPath[index]];
        index++;
      }
      return models;
    }
  };

  render(){
    const { responses } = this.props;
    return (
      <Fragment>
        {
          Object.keys(responses).map(key => {
            const response = responses[key];
            const model = this.getDefinitionModel(response.schema);
            return (
              <Card
                title={
                  <span>
                    <span style={{ marginLeft: 24 }}>{key}</span>
                    <span style={{ marginLeft: 24 }}>{response.description}</span>
                  </span>
                }
                style={{ marginBottom: 24 }}
              >
                {
                  response.schema && <Model modelObj={model} />
                }
                {
                  !response.schema && <span>没有更多描述...</span>
                }
              </Card>
            )
          })
        }
      </Fragment>
    )
  }
}
