import React, { useEffect } from "react";
import { Card, Form, Switch, Radio, Button } from "dashkit-ui";
const RadioGroup = Radio.Group;

import { useAuth, logout, getSettings, saveSettings } from "../../context/auth/AuthProvider";
import { useForm } from "../../hooks/useForm";

const Account = () => {
  const [authState, authDispatch] = useAuth();
  const { config, user } = authState;

  // form handlers
  const { handleSubmit, handleChange, data, errors, fillData } = useForm({
    // initialValues: { instance: "", email: "", password: "" },
    // initialErrors: { instance: "", email: "", password: "" },
    validations: {
      instance: {
        required: {
          value: true,
          message: "Instance field is required",
        },
        // pattern: {
        //   value: "^[a-zA-Z]*$",
        //   message: "Invalid input.",
        // },
      },
      email: {
        required: {
          value: true,
          message: "Email field is required",
        },
        custom: {
          isValid: (value) =>
            value?.match(
              /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          message: "Invalid email address",
        },
      },
      password: {
        required: {
          value: true,
          message: "Password field is required",
        },
      },
    },
    onChange: () => {
      saveSettings(authDispatch, config);
    },
  });

  useEffect(() => {
    getSettings(authDispatch, user);
  }, [user]);

  useEffect(() => {
    fillData(config);
  }, [config]);

  return (
    <>
      <Card className="account">
        <Card.Header>
          <div className="ms-Grid-row">
            <h4 className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 card-header-title float-left">Logged Details</h4>
            <Form.Item className="dk-form-item ms-Grid-col ms-sm4 ms-md4 ms-lg2 float-right logout">
              <Button type="primary" htmlType="button" icon="arrow-left" onClick={() => logout(authDispatch)}>
                Logout
              </Button>
            </Form.Item>
          </div>
        </Card.Header>
        <Card.Body>
          <ul className="list-group-lg">
            <li>
              Instance URL
              <span className="float-right">
                <a href="{user.instance}">{data.url}</a>
              </span>
            </li>
            <li>
              User Email Address <span className="float-right">{data.email}</span>
            </li>
            <li>
              User Name <span className="float-right">{data.name}</span>
            </li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="settings">
        <Card.Header>
          <div className="ms-Grid-row">
            <h4 className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 card-header-title float-left">Settings</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <ul className="list-group-lg">
            <li>
              Show integration fields
              <RadioGroup
                className="float-right"
                name="fieldsDisplay"
                onChange={(e) => handleChange("fieldsDisplay", e)}
                value={data.settings?.fieldsDisplay || 1}
              >
                <label>
                  <Radio value="1"></Radio>
                  as Keys
                </label>
                <label>
                  <Radio value="2"></Radio>
                  as Titles
                </label>
              </RadioGroup>
            </li>
            <li>
              Insert field placeholder together with title
              <span className="float-right">
                <Switch checked={data.settings?.insertWithTitle} onChange={(e) => handleChange("insertWithTitle", e)} />
              </span>
            </li>
            <li>
              User confirmation is needed for template upload
              <span className="float-right">
                <Switch
                  checked={data.settings?.uploadConfirmation}
                  onChange={(e) => handleChange("uploadConfirmation", e)}
                />
              </span>
            </li>
            <li>
              Keep me logged after MS Word reopening
              <span className="float-right">
                <Switch checked={data.settings?.keepMeLogged} onChange={(e) => handleChange("keepMeLogged", e)} />
              </span>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default Account;
