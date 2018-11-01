import React from 'react';
import ReactJson from 'react-json-view'

export default class Model extends React.PureComponent {
  render(){
    const { modelObj } = this.props;
    return (
      <ReactJson
        enableClipboard={false}
        src={modelObj} />
    )
  }
}
