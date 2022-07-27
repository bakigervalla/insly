import React, { useState, useEffect } from "react";
import { Card } from "dashkit-ui";
import { Plus } from "react-feather";

const Alternatives = ({ items }: any) => {
  const insertFields = (field: any) => {
    console.log(field);
  };

  return (
    <div className="alternatives">
      <Card className="alternatives">
        <Card.Header>
          <h4 className="card-header-title">Alternatives</h4>
        </Card.Header>
        <Card.Body>
          <ul className="list-group-lg">
            {items &&
              items.map((item, key) => (
                <li key={key}>
                  <>
                    <Plus className="add-ico" onClick={() => insertFields(item)} />
                    {item.placeholder}
                  </>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Alternatives;
