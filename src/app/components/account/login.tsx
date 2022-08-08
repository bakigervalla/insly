import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";

import { useAuth, login } from "../../context/auth/AuthProvider";
import { useForm } from "../../hooks/useForm";
import { useLocalStorage } from "@rehooks/local-storage";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [, authDispatch] = useAuth();
  const [instances, setInstances] = useState([]);
  let arr = useLocalStorage<any>("instances");

  // useLocalStorage returns empty values
  useEffect(() => {
    let _instances = [];
    arr.filter(function (el) {
      if (el != null && (typeof el[0] === "string" || el[0] instanceof String))
        _instances.push({ label: el[0], value: el[0] });
    });
    setInstances(_instances);
  }, []);

  // form handlers
  const { handleSubmit, handleChange, data, errors, fillData } = useForm({
    initialValues: { instance: "", email: "", password: "2f9uMx^YpE*`Md}D" },
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

  //   useEffect(() => {
  //     setLogin(authDispatch, user);
  //   }, []);

  //   if (!isAuthenticated) if (isAuthenticated) return <Navigate to="/" />;

  return (
    <>
      <Form onSubmit={handleSubmit} labelWidth={150} className="form">
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
              options={instances}
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
            <Link
              className="ms-sm6 ms-md6 ms-lg6 pass-remind"
              to={{ pathname: "https://uniqa.insly.site/password-recovery" }}
              target="_blank"
            >
              Forgot Password
            </Link>
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
