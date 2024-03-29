import * as React from "react";
import { useAuth } from "../../context/auth/AuthProvider";

import { Home, Layout, File } from "react-feather";
import { NavLink } from "react-router-dom";

import "regenerator-runtime/runtime";
import "babel-polyfill";

// import { Container, Row, Col } from "react-grid-system";
import { Grid } from "dashkit-ui";
const { Row, Col } = Grid;

export interface HeaderProps {
  title: string;
  logo: string;
  message: string;
}

const Headerbar = (header: HeaderProps) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;
  const { title, logo } = header;

  return (
    <>
      <Row>
        <Col xs={3} sm={3} md={2} lg={3}>
          <div className="link">
            <NavLink to="/home" activeClassName="active">
              <Home />
              <p>Home</p>
            </NavLink>
          </div>
        </Col>
        <Col xs={3} sm={3} md={2} lg={3}>
          {isAuthenticated && (
            <div className="link">
              <NavLink to="/integration" activeClassName="active">
                <Layout />
                <p>Integration</p>
              </NavLink>
            </div>
          )}
        </Col>
        <Col xs={3} sm={3} md={2} lg={3}>
          {isAuthenticated && (
            <div className="link">
              <NavLink to="/template" activeClassName="active">
                <File />
                <p>Template </p>
              </NavLink>
            </div>
          )}
        </Col>
        <Col className="logo" xs={3} sm={3} md={2} lg={3}>
          <img width="34" height="34" src={logo} alt="logo" title={title} />
        </Col>
      </Row>
    </>
  );
};

export default Headerbar;
