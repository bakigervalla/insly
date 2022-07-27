import React, { useState } from "react";
import Alternatives from "./alternatives";
import { Download } from "react-feather";

const ToggleItem = ({ field }: any) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Download className="show-alternatives" onClick={() => setToggle((prev: boolean) => !prev)} />
      {toggle && <Alternatives items={field.alternatives} />}
    </>
  );
};

export default ToggleItem;
