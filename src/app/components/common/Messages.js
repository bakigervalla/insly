import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

import { Alert } from "dashkit-ui";

const Messages = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <Alert type={alert.type} icon>
          {alert.msg}
        </Alert>
      </div>
    ))
  );
};

export default Messages;
