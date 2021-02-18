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
import AllGrids from './allGrids';
import AdminData from './adminData';
import RequestedGrids from './requestedGrids'
import { Provider, useSelector, useDispatch, connect } from 'react-redux';
import { store } from '../../redux/store';
import { setLoginState } from '../../redux/actions';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { client } from '../../config';
import "antd/dist/antd.css";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class SiderDemo extends React.Component {
    state = {
        collapsed: false,
        panelId: 1,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    onLogoutClicked() {
        console.log("clicked");
        client.logout().then((res) => {
            this.props.setLoginState(false);
            this.props.history.push("/");
        }).catch(e => {
            // Show login page (potentially with `e.message`)
            console.error('Authentication error', e);
        });
    };



    render() {

        const { collapsed, panelId } = this.state;
        const { isAuthenticated } = this.props;
        console.log(isAuthenticated);

        if (!isAuthenticated) {
            return (
                <Redirect to={{ pathname: "/" }} />
            )
        }

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
                        <Menu.Item key="2" icon={< TeamOutlined />} onClick={() => this.setState({ panelId: 2 })} >
                            User
                        </Menu.Item>
                        <Menu.Item key="3" onClick={() => this.setState({ panelId: 3 })}>All Grids</Menu.Item>
                        <Menu.Item key="4" onClick={() => this.setState({ panelId: 4 })}>Requestes</Menu.Item>
                        <Menu.Item key="5" icon={<UserOutlined />} onClick={() => this.setState({ panelId: 5 })} >
                            Admin Profile
                        </Menu.Item>
                        <Menu.Item key="6" onClick={() => this.onLogoutClicked()} icon={<LogoutOutlined />}>
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
                            panelId === 3 && <AllGrids />
                        }
                        {
                            panelId === 4 && <RequestedGrids />
                        }
                        {
                            panelId === 5 && <AdminData />
                        }
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>GMS-Admin ©2020 Created by GMS</Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return { isAuthenticated: state.authReducer.isLoggedIn };
}
export default connect(mapStateToProps, { setLoginState })(SiderDemo);