import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./ColumnActions.scss";

export default ({ id, items }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      <UncontrolledDropdown isOpen={isOpen} toggle={toggleAction}>
        <DropdownToggle tag="a" className="btn btn-light">
          <i
            className={`mdi ${
              isOpen ? "mdi-dots-horizontal" : "mdi-dots-vertical"
            }`}
          />
        </DropdownToggle>

        <DropdownMenu className="float-start">
          {items.map((item: any, i: any) => (
            <DropdownItem key={i} onClick={() => item.handler(id)}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
