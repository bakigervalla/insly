import React, { useState, useContext, useEffect } from "react";
import InslyContext from "../context/insly/InslyContext";

const useTemplates = () => {
  const [data, setData] = useState({});
  const inslyContext = useContext(InslyContext);
  const { templates } = inslyContext;

  useEffect(() => {
    if (templates) {
      setData({ ...data, ...templates });
    }
  }, [templates]);

  return data;
};

export default useTemplates;
