import React, { useState, useContext, useEffect } from "react";
import InslyContext from "../context/insly/InslyContext";

const useSettings = () => {
  const [data, setData] = useState({});
  const inslyContext = useContext(InslyContext);
  const { settings } = inslyContext;

  useEffect(() => {
    if (settings) {
      setData({ ...data, ...settings });
    }
  }, [settings]);

  return data;
};

export default useSettings;
