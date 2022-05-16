import React from "react";
import { Row } from "reactstrap";
import TablePayouts from "./table";


export default (props: any) => {
  const { payouts } = props;

  return (
    <React.Fragment>
      <Row>
        {payouts.length > 0 && <TablePayouts payouts={payouts} />}
      </Row>
    </React.Fragment>
  )
}