import { Modal, ModalBody, ModalHeader } from "reactstrap";
import React from "react";

export default (props: any) => {
  const {toggle, isOpen, id} = props

  return(
    <Modal isOpen={isOpen} toggle={toggle} centered={true} size="xl" >
      <ModalBody>
        {id}
      </ModalBody>
    </Modal>
  )
}