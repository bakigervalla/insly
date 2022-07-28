import React, { useState, FunctionComponent } from "react";
import Alternatives from "./alternatives";
import { Download } from "react-feather";

type Props = {
  field: any;
  onInsert: (field: any) => void;
};

const ToggleItem: FunctionComponent<Props> = ({ field, onInsert }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Download className="show-alternatives" onClick={() => setToggle((prev: boolean) => !prev)} />
      {toggle && <Alternatives items={field.alternatives} onInsert={onInsert} />}
    </>
  );
};

export default ToggleItem;
