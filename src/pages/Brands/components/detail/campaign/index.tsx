import React from "react";
import { Col, Row } from "reactstrap";
import SimpleSearch from "../../../../../components/UI/simpleSearch";
import TableCampaign from "./table";

export default (props : any) => {
  const {id, campaigns } = props;

  const optionsSelect = [
    {value: 'name', label: 'Search by name'},
  ];

  return (
    <React.Fragment>

      <Row className="mb-2">
        <Col className="col-md-4">
          <SimpleSearch options={optionsSelect} getDispatch={''} clearDispatch={''}/>
        </Col>
      </Row>

      <Row>
        {campaigns.length > 0 && <TableCampaign campaigns={campaigns}/>}
      </Row>

    </React.Fragment>
  )
}