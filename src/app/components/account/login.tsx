import React, { useState, useEffect, useRef } from "react";
import useLocalStorage from "../../hooks/local-storage";

import { Form, Input, Button, Checkbox } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";

const LogIn = () => {
  const [value, setValue] = useState("");
  const [instances, setInstances] = useLocalStorage("instances", []);
  const instanceRef = useRef(null);

  const handleSubmit = (event, values, errors, forms) => {
    event.preventDefault();

    return;
    setInstances(["era"]);
    setInstances(...instances, instanceRef.current.value);

    console.log(values);
    if (!errors) {
      setTimeout(() => {
        forms.reset();
      }, 2000);
    }
  };

  const handleEmailValidator = (forms, value, callback) => {
    const frm = forms;
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    if (value && !reg.test(value)) {
      callback("Email needs to be in validation email format!");
    }
  };

  const onChangeHandler = (e) => setValue(e.target.value);

  return (
    <Form onSubmit={handleSubmit} labelWidth={150} className="login">
      <h5>Login to Quote & Bind</h5>
      <Form.Item label="Instance URL" name="instanceURL" required>
        <CreatableSelect
          className="instanceURL"
          name="instance"
          placeholder="Instance URL"
          isClearable
          //   onChange={onChangeHandler}
          //   onInputChange={onChangeHandler}
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
