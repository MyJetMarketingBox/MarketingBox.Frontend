import { Modal, ModalBody, ModalHeader } from "reactstrap";
import RegisterDetail from "../registerDetail/RegisterDetail";
import React from "react";

export default (props: any) => {
  const {toggle, isOpen, regId} = props

  return(
    <Modal isOpen={isOpen} toggle={toggle} centered={true} size="xl" >
      {/*<ModalHeader toggle={toggle} tag="h4">
        ModalHeader
      </ModalHeader>*/}
      <ModalBody>
        <RegisterDetail regId={regId} />
      </ModalBody>
    </Modal>
  )
}