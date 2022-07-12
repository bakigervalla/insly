import React, { useState, useContext, useEffect } from "react";
import InslyContext from "../context/insly/InslyContext";

const useFields = () => {
  const [data, setData] = useState({});
  const inslyContext = useContext(InslyContext);
  const { fields } = inslyContext;

  useEffect(() => {
    if (fields) {
      setData({ ...data, ...fields });
    }
  }, [fields]);

  return data;
};

export default useFields;
