import React from "react";
import { Row } from "reactstrap";
import TableCampaign from "./table";

export default (props : any) => {
  const {id, campaigns } = props;

  return (
    <React.Fragment>

      <Row>
        {campaigns.length > 0 && <TableCampaign campaigns={campaigns}/>}
      </Row>

    </React.Fragment>
  )
}