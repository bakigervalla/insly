import React, { createContext, useState } from "react";

const ALERT_TIME = 5000;
const initialState = {
  text: "",
  type: "",
};

export type AlertContextType = {
  text: string;
  type: string;
  setAlert: (text: string, type: string) => void;
};

const AlertContext = createContext<AlertContextType>({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }: any) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const setAlert = (text, type) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
