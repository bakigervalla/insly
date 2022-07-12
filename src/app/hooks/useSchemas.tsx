import React, { useState, useContext, useEffect } from "react";
import InslyContext from "../context/insly/InslyContext";

const useSchemas = () => {
  const [data, setData] = useState({});
  const inslyContext = useContext(InslyContext);
  const { schemas } = inslyContext;

  useEffect(() => {
    if (schemas) {
      setData({ ...data, ...schemas });
    }
  }, [schemas]);

  return data;
};

export default useSchemas;
