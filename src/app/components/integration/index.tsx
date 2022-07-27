import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";

import FieldsList from "./fields-list";

import { Navigate } from "react-router-dom";
import { useInsly, getSchemas, getFields } from "../../context/insly/InslyState";

import { useForm } from "../../hooks/useForm";

const Index = () => {
  const [inslyState, inslyDispatch] = useInsly();
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const { schemas, fields } = inslyState;
  const [selectedField, setSelectedField] = useState({ label: "", value: "" });

  useEffect(() => {
    getSchemas(inslyDispatch);
  }, []);

  useEffect(() => {
    let schemaOptions = [];
    schemas.map((schema) => {
      schema.integrations.map((integration) => {
        schemaOptions.push({ label: `${schema.name} - ${integration.key}`, value: `${schema.id},${integration.key}` });
      });
    });
    setOptions(schemaOptions);
    // setOptions([...options, { label: `${schema.name} ${integration.label}`, value: integration.key }]);
  }, [schemas]);

  useEffect(() => {
    let arrSelected = selectedField["value"]?.split(",");
    getFields(inslyDispatch, arrSelected[0], arrSelected[1]);
  }, [selectedField]);

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
      console.log("era");
    },
  });

  return (
    <>
      <Form onSubmit={handleSubmit} labelWidth={150} className="form integration">
        <div className="schema-title">
          <Form.Item label="Choose Schema &amp; Integration:" name="schema">
            <CreatableSelect
              className="instanceURL"
              name="schema"
              value={selectedField}
              //   inputValue={data.instance || ""}
              //   onInputChange={(e: any) => handleChange("instance", e)}
              onChange={(e: any) => {
                setSelectedField(e);
                handleChange("schema", e);
              }}
              options={options}
            ></CreatableSelect>
          </Form.Item>
        </div>
        <FieldsList fields={fields} />
      </Form>
    </>
  );
};

export default Index;
