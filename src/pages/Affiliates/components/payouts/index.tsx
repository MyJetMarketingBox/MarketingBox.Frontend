import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import SimpleSearch from "../../../../components/UI/simpleSearch"
import TablePayouts from "./table"
import AddModal from "./addModal"
import { changeRootBlur } from "../../../../store/layout/actions";
import { useDispatch } from "react-redux";


const Payouts = (props: any) => {

  console.log(props);
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);

  const optionsSelect = [
    {value: 'amount', label: 'Search by amount'},
    {value: 'payoutType', label: 'Search by payout type'},
    {value: 'geo', label: 'Search by geo'}
  ];

  const toggleModal = () => {
    setModal(prev => !prev);
    //dispatch(changeRootBlur(!modal));
  };

  return (
    <React.Fragment>
      <Row className="mb-2">
        <Col className="col-md-4">
          <SimpleSearch options={optionsSelect} getDispatch={''} clearDispatch={''}/>
        </Col>
        <Col className="col-md-4 offset-4 text-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={toggleModal}
          >
            <i className="bx bx-plus me-1" /> Add New Payouts
          </button>
        </Col>
      </Row>

      <Row>
        <TablePayouts />
      </Row>

      <AddModal isOpen={modal} toggle={toggleModal} />

    </React.Fragment>
  )

}

export default Payouts