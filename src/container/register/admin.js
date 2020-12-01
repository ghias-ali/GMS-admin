import React, { } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    AlertOutlined,
    ApiOutlined,
    LogoutOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import EditableTable from './users';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
        panelId: 1
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed, panelId } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{ marginTop: 20, color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                        GMS-Admin
                    </div>

                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ padding: 10, marginTop: 0 }}>
                        <Menu.Item key="1" icon={< ApiOutlined />} onClick={() => this.setState({ panelId: 1 })} >
                            Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => this.setState({ panelId: 2 })} >
                            User
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<AlertOutlined />} title="Grids">
                            <Menu.Item key="3" onClick={() => this.setState({ panelId: 3 })}>All Grids</Menu.Item>
                            <Menu.Item key="4" onClick={() => this.setState({ panelId: 4 })}>Requestes</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5" icon={<LogoutOutlined />}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        {
                            panelId === 1 && <span>panel1</span>
                        }
                        {
                            panelId === 2 && <EditableTable />
                        }
                        {
                            panelId === 3 && <span>panel3</span>
                        }
                        {
                            panelId === 4 && <span>panel4</span>
                        }
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>GMS-Admin ©2020 Created by GMS</Footer>
                </Layout>
            </Layout>
        );
    }
}
export default SiderDemo;