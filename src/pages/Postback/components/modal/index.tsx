import {
  Col, Modal, ModalBody, ModalHeader, Row,
  Nav,
  NavItem,
  NavLink, CardText, TabPane, TabContent, ModalFooter

} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import React, { useState } from "react";
import { httpQueryType } from "../../../../common/utils/model";
import { addPostback } from "../../../../store/postback/actions";


export default ({isOpen, toggle}: any) => {

  const dispatch = useDispatch();

  const [customActiveTab, setcustomActiveTab] = useState("1");

  const handleValidSubmit = (values: any) => {
    const postback = {
      registrationReference: values["registrationReference"],
      registrationTGReference: values["registrationTGReference"],
      depositReference: values["depositReference"],
      depositTGReference: values["depositTGReference"],
      httpQueryType: +values["httpQueryType"],
    };
    console.log(postback);
    dispatch(addPostback(postback)); // save new postback
    toggle();
  };

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} cssModule={{filter: "blur(5px)"}}>
      <ModalHeader toggle={toggle} tag="h4">
        Add a new Postback
      </ModalHeader>

      <ModalBody>
        <AvForm
          onValidSubmit={(
            e: any,
            values: any
          ) => {
            handleValidSubmit(values);
          }}
        >
          <Row form>
            <Col xs={12}>

              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="d-none d-sm-block">Lead</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">Deposit</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={customActiveTab}
                className="p-3 text-muted"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <AvField
                          name="registrationReference"
                          label="URL"
                          type="text"
                          placeholder="Enter lead URL"
                          value=""
                        />

                        <AvField
                          name="registrationTGReference"
                          label="URL TG"
                          type="text"
                          placeholder="Enter lead URL TG"
                          value=""
                        />

                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <AvField
                          name="depositReference"
                          label="URL"
                          type="text"
                          placeholder="Enter deposit URL"
                          value=""
                        />

                        <AvField
                          name="depositTGReference"
                          label="URL TG"
                          type="text"
                          placeholder="Enter deposit URL TG"
                          value=""
                        />
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>

          <Row form>
            <Col xs={12}>
              <div className="p-3">
                <AvField
                  type="select"
                  name="httpQueryType"
                  label="Query Type*"
                  className="form-select"
                  errorMessage="Invalid query type"
                  validate={{
                    required: { value: true }
                  }}
                >
                  <option value="" key={0} >Select query type</option>
                  {
                    httpQueryType.map((item, idx) => {
                      return <option value={idx} key={idx+1}>{item}</option>
                    })
                  }
                </AvField>
              </div>
            </Col>
          </Row>

          <ModalFooter>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-success save-user"
                >
                  Save
                </button>
              </div>
            </Col>
          </ModalFooter>
        </AvForm>
      </ModalBody>
    </Modal>
  )
}