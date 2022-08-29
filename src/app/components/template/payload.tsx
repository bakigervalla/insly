import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import * as _ from "lodash";
import CreatableSelect from "react-select/creatable";
import { useAuth } from "../../context/auth/AuthProvider";
import { useInsly, getPayloadJSON, getDocumentPreview } from "../../context/insly/InslyState";

import { Form, Input, Button } from "dashkit-ui";
import { Container, Row, Col } from "react-grid-system";
import { PDFViewer } from "./pdfviewer";
import Modal from "react-modal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
  },
};

const modalPayloadStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    minHeight: "250px",
    padding: "20px 0",
  },
};

const TemplatePayload = ({ Json }: any) => {
  const [authState] = useAuth();
  const { config } = authState;
  const [inslyState, inslyDispatch] = useInsly();
  const { documentPreview, schemas, schema } = inslyState;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalPayload, setmModalPayload] = React.useState(false);

  const [schemaOptions, setSchemaOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedSchema, setSelectedSchemaField] = useState(schema);
  const [pretty, setJson] = useState(Json);
  const { data, handleChange } = useForm({});

  let filePath = Office.context.document.url;

  const previewDocument = () => {
    getDocumentPreview(inslyDispatch, filePath);
  };

  useEffect(() => {
    let schemaOptions = [];
    console.log("schemaOptions");
    console.log(schemas);
    schemas.map((schema) => {
      schema.integrations.map((integration) => {
        schemaOptions.push({ label: `${schema.name} - ${integration.key}`, value: `${schema.id},${integration.key}` });
      });
    });
    setSchemaOptions(schemaOptions);
  }, [schemas]);

  const loadPayload = () => {
    let _selectedSchema = data.schema.value?.split(","); // id, name
    if (_selectedSchema[0] === "") return;
    getPayloadJSON(inslyDispatch, _selectedSchema[0], _selectedSchema[1], data.quote);
    setmModalPayload(false);
  };

  useEffect(() => {
    if (documentPreview) setIsOpen(true);
  }, [documentPreview]);

  useEffect(() => {
    setJson(JSON.stringify(Json, undefined, 4));
  }, [Json]);

  const setJsonField = (e) => {
    setJson(e.target.value);
  };

  return (
    <>
      <div className="dk-form-item payload">
        <div className="ms-Grid-row">
          <label className="ms-sm4 ms-md4 ms-lg4">
            <strong>Payload Sample</strong>
          </label>
          <div className="ms-sm8 ms-md8 ms-lg8 text-right">
            <label className="label-link">Format Nicely</label>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="payload-json">
            {/* <input type="textarea" value={JSON.stringify(Json, null, 2)}></input> */}
            <textarea onChange={setJsonField} value={pretty} />
          </div>
          <Button type="primary" icon="database" onClick={() => setmModalPayload(true)}>
            Generate Payload
          </Button>
          <Button className="right" type="primary" icon="eye" onClick={previewDocument}>
            Preview document
          </Button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Property of Insly"
      >
        <Button round icon="x" className="pdf-viewer-close-btn" onClick={() => setIsOpen(false)} />
        <PDFViewer base64={documentPreview} />
      </Modal>
      <Modal isOpen={modalPayload} style={modalPayloadStyle}>
        <div className="dk-form form template payload-modal-form">
          <Form.Item label="Choose Schema &amp; Integration:" name="schema">
            <CreatableSelect
              className="instanceURL"
              name="schema"
              value={data?.schema || {}}
              options={schemaOptions}
              onChange={(e: any) => {
                // setSelectedSchemaField(e);
                handleChange("schema", e);
              }}
            ></CreatableSelect>
          </Form.Item>
          <Form.Item label="Use Specific Quote Values (number or uuid)" name="quote">
            <Input
              placeholder="Quote values"
              name="quote"
              value={data?.quote || ""}
              onChange={(e: any) => handleChange("quote", e)}
            />
          </Form.Item>
          <div className="grid-payload">
            <Button type="primary" icon="x" onClick={() => setmModalPayload(false)}>
              Cancel
            </Button>
            <Button type="primary" icon="download-cloud" onClick={loadPayload}>
              Load payload
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TemplatePayload;
