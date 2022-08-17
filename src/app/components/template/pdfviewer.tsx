import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export const PDFViewer = (base64) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  console.log("base64");
  console.log(base64.base64);

  return (
    <div>
      <Document file={base64.base64}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
export default PDFViewer;
