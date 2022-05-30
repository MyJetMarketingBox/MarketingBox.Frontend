import React from "react";
import { Row } from "reactstrap";
import TablePayouts from "./table";


const Payouts = (props: any) => {

  const {id, payouts } = props;

  return (
    <Row>
      {payouts.length > 0 && <TablePayouts payouts={payouts}/>}
    </Row>
  )

}

export default Payouts