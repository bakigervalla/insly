import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import useAlert from "../../hooks/useAlert";

import { Navigate } from "react-router-dom";
import { useAuth, login, setLogin } from "../../context/auth/AuthProvider";
import { useForm } from "../../hooks/useForm";
import { useLocalStorage } from "@rehooks/local-storage";
import setAuthToken from "../../context/auth/setAuthToken";

const LogIn = () => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;
  let arr = useLocalStorage<any>("instances");
  let [user] = useLocalStorage<any>("instances");
  // const { setAlert } = useAlert();

  // useLocalStorage returns empty values
  let instances = arr.filter(function (el) {
    return el != null && (typeof el === "string" || el instanceof String);
  });

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
    onSubmit: () => {
      login(
        authDispatch,
        {
          instance: Array.isArray(data.instance.value) ? data.instance.value[0] : data.instance.value,
          email: data.email,
          password: data.password,
          rememberme: data.rememberme ?? false,
        },
        instances ?? []
      );
    },
  });

  useEffect(() => {
    setLogin(authDispatch, user);
  }, []);

  useEffect(() => {
    setAuthToken(user.token);
  }, [isAuthenticated]);

  if (!isAuthenticated) if (isAuthenticated) return <Navigate to="/" />;

  return (
    <>
      <Form onSubmit={handleSubmit} labelWidth={150} className="login">
        <h5>Login to Quote &amp; Bind</h5>
        <div>
          <Form.Item label="Instance URL" name="instance">
            <CreatableSelect
              className="instanceURL"
              name="instance"
              placeholder="Instance URL"
              isClearable
              value={data.instance || []}
              //   inputValue={data.instance || ""}
              //   onInputChange={(e: any) => handleChange("instance", e)}
              onChange={(e: any) => handleChange("instance", e)}
              options={instances.map((val) => {
                return { value: val, label: val };
              })}
            ></CreatableSelect>
          </Form.Item>
          {errors.instance && <p className="error">{errors.instance}</p>}
        </div>
        <Form.Item label="Email" name="email">
          <Input
            placeholder="Email Address"
            name="email"
            value={data.email || ""}
            onChange={(e: any) => handleChange("email", e)}
          />
        </Form.Item>
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="dk-form-item">
          <div className="ms-Grid-row">
            <label className="ms-sm6 ms-md6 ms-lg6 pass-label">Password</label>
            <Checkbox
              className="ms-sm6 ms-md6 ms-lg6 pass-remind"
              checked={data.rememberme || false}
              onChange={(e: any) => handleChange("rememberme", e.target.checked)}
            >
              Remind Password
            </Checkbox>
          </div>
          <div className="ms-Grid-row ms-Grid-col ms-md12">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password || ""}
              onChange={(e: any) => handleChange("password", e)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>
        <Form.Item className="right">
          <Button type="primary" htmlType="submit" icon="arrow-right">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogIn;
