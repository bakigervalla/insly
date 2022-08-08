import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { useAuth } from "../../context/auth/AuthProvider";
import { useInsly, getDocumentPreview } from "../../context/insly/InslyState";

import { Button } from "dashkit-ui";
import { Link } from "react-router-dom";

const TemplatePayload = ({ Json }: any) => {
  const [authState] = useAuth();
  const { config } = authState;
  const [inslyState, inslyDispatch] = useInsly();
  const { documentPreview } = inslyState;

  const previewDocument = () => {
    let filePath = Office.context.document.url;
    getDocumentPreview(inslyDispatch, filePath);
  };
  return (
    <>
      {Json && (
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
              <pre>{JSON.stringify(Json, null, 2)}</pre>
            </div>
            <Button type="primary" icon="file-text" onClick={previewDocument}>
              Preview
            </Button>
            <Link to={{ pathname: documentPreview }} target="_blank">
              Era
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplatePayload;
