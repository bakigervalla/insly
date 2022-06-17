import React, { useContext, useState, useEffect } from "react";
import { useAuth, clearErrors, login } from "../../context/auth/AuthState";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";

import useLocalStorage from "../../utils/local-storage";

import { Form, Input, Button, Checkbox } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";

const LogIn = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const [instances] = useLocalStorage("instances", []);

  useEffect(() => {
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, authDispatch, setAlert]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleEmailValidator = (forms, value, callback) => {
    const frm = forms;
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    if (value && !reg.test(value)) {
      callback("Email needs to be in validation email format!");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <Form onSubmit={onSubmitHandler} labelWidth={150} className="login">
      <h5>Login to Quote & Bind</h5>
      <Form.Item label="Instance URL" name="instanceURL" required>
        <CreatableSelect
          className="instanceURL"
          name="instance"
          placeholder="Instance URL"
          isClearable
          onChange={onChange}
          options={instances.map((val) => {
            return { value: val, label: val };
          })}
        ></CreatableSelect>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        required
        rule={{
          message: "Please input your email",
          validator: handleEmailValidator,
        }}
      >
        <Input placeholder="Email Address" />
      </Form.Item>
      <Form.Item label="Password" name="confirmPassword" required>
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item className="checkbox">
        <Checkbox>Remind Password</Checkbox>
      </Form.Item>
      <Form.Item className="right">
        <Button type="primary" htmlType="submit" icon="arrow-right">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LogIn;
