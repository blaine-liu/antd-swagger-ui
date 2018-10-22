import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import router from 'umi/router';

import './index.less';

const { SubMenu, Item } = Menu;
const { Header, Sider, Content } = Layout;

export default
@connect(({ swagger }) => ({
  swagger,
}))
class UserCenterLayout extends Component {

  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      information: "我的资料",
      security: "安全设置",
      service: "我的服务",
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      menuMap,
      selectKey: menuMap[key] ? key : 'basic',
      collapsed: false,
    };
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  selectKey = ({ key }) => {
    const { menuMap } = this.state;
    this.setState({
      selectKey: key,
    });
    router.push({
      pathname: `/app/user-center/${key}`,
      state: {
        pageTitle: menuMap[key]
      }
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleMenuOnClick = ({ item, key }) => {
    router.push(`/${key.replace(/\//g,'%2F')}`);
  };

  renderSiderMenu = () => {
    const { swagger: { apiData } } = this.props;
    const { tags, paths } = apiData;
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[]} onClick={this.handleMenuOnClick}>
        {
          tags && tags.map((tag,index) => {
            return (
              <SubMenu key={`tag-${index}`} title={tag.name}>
                {
                  Object.keys(paths).map(pathKey => {
                    return Object.keys(paths[pathKey]).map(methodKey => {
                      const method = paths[pathKey][methodKey];
                      return method.tags.findIndex(t => t === tag.name) && <Menu.Item key={`${methodKey}-${pathKey}`}>{pathKey}  {method.summary}</Menu.Item>;
                    })
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    )
  };

  render(){
    const { selectKey, menuMap } = this.state;
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={248}
        >
          <div className="swagger-logo">
            <img height="30" width="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwBUfwB0lzB/n0BfhxBpjyC0x4////+qv4CJp1D09++ft3C/z5/K16/U379UfwDf58/q79+Ur2D2RCk9AAAAHXRSTlMAEEAwn9//z3Agv4/vYID/////////////////UMeji1kAAAD8SURBVHgBlZMFAoQwDATRxbXB7f+vPKnlXAZn6k2cf3A9z/PfOC8IIYni5FmmABM8FMhwT17c9hnhiZL1CwvEL1tmPD0qSKq6gaStW/kMXanVmAVRDUlH1OvuuTINo6k90Sxf8qsOtF6g4ff1osP3OnMcV7d4pzdIUtu1oA4V0DZoKmxmlEYvtDUjjS3tmKmqB+pYy8pD1VPf7jPE0I40HHcaBwnue6fGzgyS5tXIU96PV7rkDWHNLV0DK4FkoKmFpN5oUnvi8KoeA2/JXsmXQuokx0siR1G8tLkN6eB9sLwJp/yymcyaP/TrP+RPmbMMixcJVgTR1aUZ93oGXsgXQAaG6EwAAAAASUVORK5CYII=" alt="Swagger UI" />
            <h2>swagger</h2>
          </div>
          {this.renderSiderMenu()}
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="react-swagger-ui-trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
