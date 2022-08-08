import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

import InslyState from "../../app/context/insly/InslyState";
import AuthProvider from "../../app/context/auth/AuthProvider";
import PrivateRoute from "./PrivateRoute";

import Headerbar from "../../app/components/common/Header";
import Progress from "../../app/components/common/Progress";

import Home from "../../app/pages/home";
import Integration from "../../app/pages/integration";
import Template from "../../app/pages/template";

import "../../../node_modules/dashkit-ui/lib/style/index.css";
import "../../taskpane/taskpane.css";

import "regenerator-runtime/runtime";
import "babel-polyfill";

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
      <AuthProvider>
        <InslyState>
          <BrowserRouter>
            <Layout>
              <Header>
                <Headerbar logo={"assets/icon-80.png"} title={this.props.title} message="Welcome" />
              </Header>
              <Layout>
                <Content>
                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    transition={Slide}
                  />
                  <Switch>
                    <PrivateRoute path="/integration" component={Integration} exact />
                    <PrivateRoute path="/template" component={Template} exact />
                    <Route path="/home" component={Home} exact />
                    <Route path="/" component={Home} />
                    {/* <Redirect to="/home" /> */}
                  </Switch>
                </Content>
              </Layout>
              <Footer>Insly (c) 2022 v1.0 | Document Template Assistant</Footer>
            </Layout>
          </BrowserRouter>
        </InslyState>
      </AuthProvider>
    );
  }
}
