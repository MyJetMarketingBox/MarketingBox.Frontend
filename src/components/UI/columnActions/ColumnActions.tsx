import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "./ColumnActions.scss";
import { TableButtonHandlerEnum } from "../../../enums/TableButtonHandlerEnum";
import { RegistrationStatusEnum } from "../../../enums/RegistrationStatusEnum";

interface EditStatusHandlerType {
  status: RegistrationStatusEnum
}

interface Item {
  label: string,
  handler: (...args: any) => void,
  type?: TableButtonHandlerEnum
}

interface Props {
  id: number,
  items: Item[],
  data?: EditStatusHandlerType | any,
}

export default ({ id, items, data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderBtnByType = (item: Item) => {
    switch (item.type) {
      case TableButtonHandlerEnum.EditStatus:
        return (
          <DropdownItem onClick={() => item.handler(id, data?.status)}>
            {item.label}
          </DropdownItem>
        )
      default:
        return (
          <DropdownItem onClick={() => item.handler(id)}>
            {item.label}
          </DropdownItem>
        )
    }
  }

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
          {items.map((item) => (
            <React.Fragment key={`${item.label}-${id}`}>
              {renderBtnByType(item)}
            </React.Fragment>
          ))}
        </DropdownMenu>


      </UncontrolledDropdown>
    </div>
  );
};
