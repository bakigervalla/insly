import * as React from "react";
import { Alert } from "dashkit-ui";
export declare type AlertType = "default" | "success" | "error" | "warning" | "info" | "loading";
import useAlert from "../../hooks/useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        type={type as AlertType}
        closable={true}
        icon={true}
        // sx={{
        //   position: "absolute",
        //   zIndex: 10,
        // }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
