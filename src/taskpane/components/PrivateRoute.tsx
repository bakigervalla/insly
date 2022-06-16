import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute() {
  //({ component: Component }) {
  //}, ...rest }) {
  const isLogged = false; // useState

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return <h1>Era</h1>;
  //   return isLogged ? <Component /> : <Navigate to="/login" />;
}
