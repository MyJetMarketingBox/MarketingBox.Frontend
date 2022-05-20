import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import React from "react";
import { useSelector } from "react-redux";

export default (props: any) => {
  const { toggle, isOpen, id } = props;

  const { log } = useSelector((state: any) => {
    return {
      log: state.PostbackLogs.logs.items.find((item: any) => {
        return item.id == id;
      }),
    };
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered={true} size="xl">
      <ModalBody>
        <Row style={{ wordBreak: "break-word" }}>
          <Col className="col-6">
            <h4>Event message</h4>
            {log.eventMessage}
          </Col>
          <Col className="col-6">
            <h4>Response</h4>
            {log.postbackResponse}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
