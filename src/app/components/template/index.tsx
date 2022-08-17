import React, { useState, useEffect } from "react";
import { Form, Button } from "dashkit-ui";
import CreatableSelect from "react-select/creatable";
import { useForm } from "../../hooks/useForm";
import TemplatePayload from "./payload";

import { useInsly, getTemplates, getSchemas, submitDocument, getDocument } from "../../context/insly/InslyState";

const Index = () => {
  const [inslyState, inslyDispatch] = useInsly();
  const { templates, schemas, payloadJson } = inslyState;
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedField, setSelectedField] = useState({ label: "", value: "" });

  const { handleSubmit, handleChange } = useForm({});

  useEffect(() => {
    getTemplates(inslyDispatch);
    getSchemas(inslyDispatch);
  }, []);

  useEffect(() => {
    let templateOptions = [];
    console.log("templates");
    console.log(templates);
    templates.map((template) => {
      templateOptions.push({
        label: `${template.title} (${template.tag})`,
        value: `${template.tag},${template.locale},${template.id}`,
      });
    });
    setOptions(templateOptions);
  }, [templates]);

  useEffect(() => {
    // getFields(inslyDispatch, arrSelected[0], arrSelected[1]);
  }, [selectedField]);

  const uploadDocument = () => {
    let _selectedTemplate = selectedField["value"]?.split(",");
    let filePath = Office.context.document.url;
    submitDocument(inslyDispatch, _selectedTemplate[0], _selectedTemplate[1], filePath);
  };
  //   const downloadDocument = () => {
  //     let _selectedTemplate = selectedSchema["value"]?.split(",");
  //     console.log(_selectedTemplate);

  //     getDocument(inslyDispatch, _selectedTemplate[0]);
  //   };

  return (
    <>
      <Form onSubmit={handleSubmit} labelWidth={150} className="form template">
        <div className="schema-title">
          <Button icon="refresh-cw" className="refresh-template-btn" onClick={() => getTemplates(inslyDispatch)} />
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
            <Button type="primary" icon="download-cloud">
              Download
            </Button>
          </div>
        </div>
        <div className="schema-title">
          <TemplatePayload Json={payloadJson} />
        </div>
      </Form>
    </>
  );
};

export default Index;
