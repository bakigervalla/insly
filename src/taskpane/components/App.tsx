import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import InslyState from "../../app/context/store/InslyState";
// import AuthState from "../../app/context/auth/AuthState";
import AlertState from "../../app/context/alert/AlertState";
import PrivateRoute from "./PrivateRoute";

require("regenerator-runtime/runtime");

import Headerbar from "../../app/components/common/Header";
import Progress from "../../app/components/common/Progress";
import Messages from "../../app/components/common/Messages";

import Home from "../../app/pages/home";
import Integration from "../../app/pages/integration";
import Template from "../../app/pages/template";

import "../../../node_modules/dashkit-ui/lib/style/index.css";
import "../../taskpane/taskpane.css";

import { Layout } from "dashkit-ui";
const { Header, Footer, Content } = Layout;

/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export default class App extends React.Component<AppProps> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration",
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality",
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro",
        },
      ],
    });
  }

  click = async () => {
    return Word.run(async (context) => {
      /**
       * Insert your Word code here
       */

      // insert a paragraph at the end of the document.
      const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);

      // change the paragraph color to blue.
      paragraph.font.color = "blue";

      await context.sync();
    });
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <InslyState>
        <AlertState>
          <BrowserRouter>
            <Layout>
              <Header>
                <Headerbar logo={"assets/icon-80.png"} title={this.props.title} message="Welcome" />
              </Header>
              <Layout>
                <Content>
                  <Messages />
                  <Switch>
                    <Route exact path="/integration" component={<PrivateRoute component={Integration} />} />
                    <Route exact path="/template" component={<PrivateRoute component={Template} />} />
                    <Route exact path="/home" component={Home} />
                    <Redirect to="/home" />
                  </Switch>
                </Content>
              </Layout>
              <Footer>Insly (c) 2022 v1.0 | Document Template Assistant</Footer>
            </Layout>
          </BrowserRouter>
        </AlertState>
      </InslyState>
    );
  }
}
