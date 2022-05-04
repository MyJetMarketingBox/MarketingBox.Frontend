import React, { useState } from "react";
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import SimpleSearch from "../../../../../components/UI/simpleSearch";
import TablePayouts from "./table";
import AssignModal from "./modal/assign"
import AddModal from "../../../../../components/UI/modal/payouts/addBrand"


export default (props: any) => {

  const {payouts } = props;

  const [modalAdd, setAddModal] = useState<boolean>(false);
  const [modalAssign, setAssignModal] = useState<boolean>(false);
  const [plusBtn, setPlusBtn] = useState(false);

  const optionsSelect = [
    {value: 'amount', label: 'Search by amount'},
    {value: 'payoutType', label: 'Search by payout type'},
    {value: 'geo', label: 'Search by geo'}
  ];

  const toggleModalAdd = () => {
    setAddModal(prev => !prev);
  };

  const toggleModalAssign = () => {
    setAssignModal(prev => !prev);
  };

  return (
    <React.Fragment>
      <Row className="mb-2">
        <Col className="col-md-4">
          <SimpleSearch options={optionsSelect} getDispatch={''} clearDispatch={''}/>
        </Col>
        <Col className="col-md-4 offset-4 text-end">
          <Dropdown
            isOpen={plusBtn}
            toggle={() => {
              setPlusBtn(!plusBtn);
            }}
            className="btn-group me-2 mb-2 mb-sm-0"
          >
            <DropdownToggle
              className="btn btnOrange waves-light waves-effect dropdown-toggle"
              tag="i"
            >
              <i className="bx bx-list-plus"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggleModalAdd}>New Payout</DropdownItem>
              <DropdownItem onClick={toggleModalAssign}>Assign</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </Col>
      </Row>

      <Row>
        {payouts.length > 0 && <TablePayouts payouts={payouts}/>}
      </Row>

      <AddModal isOpen={modalAdd} toggle={toggleModalAdd} isBrand={true}/>
      <AssignModal isOpen={modalAssign} toggle={toggleModalAssign}/>

    </React.Fragment>
  )
}