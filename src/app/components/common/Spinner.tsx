import React from "react";

import "regenerator-runtime/runtime";
import "babel-polyfill";

import { Spin } from "dashkit-ui";

type SpinProps = {
  spinning: boolean;
};

const Spinner: React.FC<SpinProps> = ({ spinning }) => <Spin spinning={spinning} />;

export default Spinner;
