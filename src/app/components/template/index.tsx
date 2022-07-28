import React, { useState, useEffect } from "react";
import { Form, Button } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";
import { useForm } from "../../hooks/useForm";
import TemplatePayload from "./payload";

import {
  useInsly,
  getTemplates,
  getSchemas,
  submitDocument,
  getDocument,
  getPayloadJSON,
} from "../../context/insly/InslyState";

const Index = () => {
  const [inslyState, inslyDispatch] = useInsly();
  const { templates, schemas, schema, payloadJson } = inslyState;
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedField, setSelectedField] = useState({ label: "", value: "" });

  const [schemaOptions, setSchemaOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedSchema, setSelectedSchemaField] = useState(schema);

  const { handleSubmit, handleChange } = useForm({});

  useEffect(() => {
    getTemplates(inslyDispatch);
    getSchemas(inslyDispatch);
  }, []);

  useEffect(() => {
    let templateOptions = [];
    templates.map((template) => {
      templateOptions.push({
        label: `${template.title} (${template.tag})`,
        value: `${template.tag},${template.locale},${template.id}`,
      });
    });
    setOptions(templateOptions);
  }, [templates]);

  useEffect(() => {
    let schemaOptions = [];
    schemas.map((schema) => {
      schema.integrations.map((integration) => {
        schemaOptions.push({ label: `${schema.name} - ${integration.key}`, value: `${schema.id},${integration.key}` });
      });
    });
    setSchemaOptions(schemaOptions);
  }, [schemas]);

  useEffect(() => {
    // getFields(inslyDispatch, arrSelected[0], arrSelected[1]);
  }, [selectedField]);

  useEffect(() => {
    let _selectedSchema = selectedSchema["value"]?.split(",");
    getPayloadJSON(inslyDispatch, _selectedSchema[0], _selectedSchema[1]);
  }, [selectedSchema]);

  const uploadDocument = () => {
    let _selectedTemplate = selectedField["value"]?.split(",");
    submitDocument(inslyDispatch, _selectedTemplate[0], _selectedTemplate[1], null);
  };
  const downloadDocument = () => {
    let _selectedTemplate = selectedField["value"]?.split(",");
    getDocument(inslyDispatch, _selectedTemplate[2]);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} labelWidth={150} className="form template">
        <div className="schema-title">
          <Form.Item label="Select Document Template:" name="template">
            <CreatableSelect
              className="instanceURL"
              name="template"
              value={selectedField}
              onChange={(e: any) => {
                setSelectedField(e);
                handleChange("template", e);
              }}
              options={options}
            ></CreatableSelect>
          </Form.Item>
        </div>
        <div className="template-actions-buttons document">
          <div>
            <Button type="primary" icon="upload-cloud" onClick={uploadDocument}>
              Upload
            </Button>
            <Button type="primary" icon="download-cloud" onClick={downloadDocument}>
              Download
            </Button>
          </div>
        </div>
        <div className="schema-title">
          <Form.Item label="Choose Schema &amp; Integration:" name="schema">
            <CreatableSelect
              className="instanceURL"
              name="schema"
              value={selectedSchema}
              onChange={(e: any) => {
                setSelectedSchemaField(e);
                handleChange("schema", e);
              }}
              options={schemaOptions}
            ></CreatableSelect>
          </Form.Item>
          <TemplatePayload payload={payloadJson} />
        </div>
      </Form>
    </>
  );
};

export default Index;
