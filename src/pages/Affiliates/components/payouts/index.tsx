import React from "react";
import { Row } from "reactstrap";
import TablePayouts from "./table";


const Payouts = (props: any) => {

  const { payouts } = props;

  return (
    <Row>
      <TablePayouts payouts={payouts}/>
    </Row>
  )

}

export default Payouts