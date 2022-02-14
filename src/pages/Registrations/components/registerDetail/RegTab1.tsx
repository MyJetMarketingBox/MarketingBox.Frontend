import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

export default (props: any) => {

  const {additionalInfo} = props;

  return (
    <React.Fragment>
      <Card>
        {/*<CardHeader>
          <CardTitle className="mb-0">About</CardTitle>
        </CardHeader>*/}
        <CardBody>
          {/*additionalInfo:
          affCode: "test"
          funnel: "hello"
          sub1: "hello"
          sub2: "test"
          sub3: "1243435"
          sub4: "q"
          sub5: "w"
          sub6: "e"
          sub7: "r"
          sub8: "t"
          sub9: "y"
          sub10: "test_s!123"*/}
            <div className="pb-3">
              <Row>
                {
                  Object.entries(additionalInfo).map(([key, value]: any) => {
                    return (
                      <Col xl={4} key={key} className="mb-2">
                        <div style={{border: "1px solid #c6c6c6", marginLeft: "auto",
                          marginRight: "auto", padding: "15px", backgroundColor:"#dbd6d6", textAlign: "center", borderRadius: "5px"}}>
                          {value  || key}
                        </div>
                      </Col>
                    )
                  })
                }



              </Row>
            </div>
        </CardBody>
      </Card>

    </React.Fragment>
  );
};
