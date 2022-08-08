import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { useAuth } from "../../context/auth/AuthProvider";

import { Form, Card, Input, Button, Checkbox } from "dashkit-ui";
import { Plus } from "react-feather";

import ToggleItem from "./toggle-item";

const FieldsList = ({ fields }: any) => {
  const [authState] = useAuth();
  const { config } = authState;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [orderType, setOrderType] = useState("asc");
  // const [inslyState, inslyDispatch] = useInsly();
  // const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  // const { schemas } = inslyState;

  useEffect(() => {
    setFilter(fields);
  }, [fields]);

  const handleSearch = (e: any) => {
    setSearch(e);
    if (!e) {
      setFilter(fields);
      return;
    }
    setFilter(
      _.filter(fields, (item) => {
        return config.settings.fieldsDisplay == "1"
          ? item.name.toLowerCase().includes(e.toLowerCase())
          : item.title.toLowerCase().includes(e.toLowerCase());
      })
    );
  };

  const insertFields = (field: any) => {
    let insertWithTitle = config.settings.insertWithTitle;
    let text = insertWithTitle ? `${field.title}: ${field.placeholder}` : field.placeholder;

    Word.run(async (context) => {
      context.document.body.insertText(text, Word.InsertLocation.end);
      await context.sync();
    });
  };

  const sortOrder = (type: string = "appearance") => {
    if (!filter) return;

    switch (type) {
      case "appearance":
        setFilter(_.orderBy(fields, "title", orderType === "asc" ? "desc" : "asc"));
        break;
      case "name":
        setFilter(_.orderBy(fields, "name", orderType === "asc" ? "desc" : "asc"));
        break;
    }
    setOrderType(orderType === "asc" ? "desc" : "asc");
  };

  return (
    <div className="dk-form-item fields">
      <div className="ms-Grid-row">
        <label className="ms-sm4 ms-md4 ms-lg4">
          <strong>Fields List</strong>
        </label>
        <div className="ms-sm8 ms-md8 ms-lg8 text-right">
          <label className="label-link" onClick={() => sortOrder("appearance")}>
            Sort by Appearance
          </label>
          <label>&nbsp;|&nbsp;</label>
          <label className="label-link" onClick={() => sortOrder("name")}>
            Sort by Name
          </label>
        </div>
      </div>
      <div className="ms-Grid-row">
        <Input placeholder="Search" name="search" value={search} onChange={handleSearch} />
      </div>

      <ul className="fields-list">
        {filter?.length > 0
          ? filter.map((field, key) => {
              return (
                <li key={key} title={field.title}>
                  <Plus className="add-ico" onClick={() => insertFields(field)} />
                  {config.settings.fieldsDisplay == "1" ? field.name : field.title}
                  <ToggleItem field={field} onInsert={insertFields} />
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default FieldsList;
