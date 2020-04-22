import React, { ReactChild } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

export const SuppliersDashboard = ({ children }: { children: ReactChild }) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["supplier"]}>
        <Menu.Item key="supplier">
          <Link to="/">Suppliers</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content>
      <div className="site-layout-content">{children}</div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Supplier Dashboard ©2020 Created by Silver Xu
    </Footer>
  </Layout>
);
