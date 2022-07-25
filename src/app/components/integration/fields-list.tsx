import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "dashkit-ui";
// import CreatableSelect from "react-select/creatable";

// import { Navigate } from "react-router-dom";
// import { useInsly, getSchemas } from "../../context/insly/InslyState";

// import { useForm } from "../../hooks/useForm";

const FieldsList = ({ items }: any) => {
  const [search, setSearch] = useState("");
  // const [inslyState, inslyDispatch] = useInsly();
  // const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  // const { schemas } = inslyState;

  console.log(items);

  const handleSearch = (e: any) => {
    console.log(e);
  };

  return (
    <div className="dk-form-item">
      <div className="ms-Grid-row">
        <label className="ms-sm6 ms-md6 ms-lg6">Fields List</label>
        <label className="ms-sm3 ms-md6 ms-lg6 right">Sort by Appearance</label>
        <label className="ms-sm3 ms-md6 ms-lg6 right">Sort by Name</label>
      </div>
      <div className="ms-Grid-row">
        <Input placeholder="Search" name="search" value={search} onChange={handleSearch} />
      </div>
      <div className="ms-Grid-row">
        {items &&
          items.fields.map((item, key) => {
            return <li key={key}>{item.name}</li>;
          })}
      </div>
    </div>
  );
};

export default FieldsList;
