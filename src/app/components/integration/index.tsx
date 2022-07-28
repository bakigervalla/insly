import React, { useState, useEffect } from "react";
import { Form } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";

import { useInsly, getSchemas, getFields, setSchema } from "../../context/insly/InslyState";
import { useForm } from "../../hooks/useForm";
import FieldsList from "./fields-list";

const Index = () => {
  const [inslyState, inslyDispatch] = useInsly();
  const { schemas, fields } = inslyState;
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
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
    setSchema(inslyDispatch, selectedField);
  }, [selectedField]);

  // form handlers
  const { handleSubmit, handleChange } = useForm({});

  return (
    <>
      <Form onSubmit={handleSubmit} labelWidth={150} className="form integration">
        <div className="schema-title">
          <Form.Item label="Choose Schema &amp; Integration:" name="schema">
            <CreatableSelect
              className="instanceURL"
              name="schema"
              value={selectedField}
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
