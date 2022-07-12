import React, { useState, useContext, useEffect } from "react";
import InslyContext from "../context/insly/InslyContext";

const useDocuments = () => {
  const [data, setData] = useState({});
  const inslyContext = useContext(InslyContext);
  const { documents } = inslyContext;

  useEffect(() => {
    if (documents) {
      setData({ ...data, ...documents });
    }
  }, [documents]);

  return data;
};

export default useDocuments;
