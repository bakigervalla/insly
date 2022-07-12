import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

const useAlert = () => useContext(AlertContext);

export default useAlert;
