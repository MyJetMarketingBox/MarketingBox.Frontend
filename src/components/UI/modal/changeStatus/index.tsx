import React, { ChangeEvent, useEffect, useState } from "react";
import { Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { AvField, AvForm, AvInput } from "availity-reactstrap-validation";
import { useDispatch, useSelector } from "react-redux";
import { changeRootBlur } from "../../../../store/layout/actions";
import { RegistrationStatusObj } from "../../../../common/utils/model";
import { RegistrationStatusEnum } from "../../../../enums/RegistrationStatusEnum";
import { updateRegistrationStatus } from "../../../../store/registrations/actions";

interface UpdateResponse {
  status: RegistrationStatusEnum,
  comment: string
}

interface Props {
  isOpen: boolean,
  toggle: (toggle: boolean) => void,
  //handleUpdate: (id: number, resp: UpdateResponse) => void,
  id: number,
  status: RegistrationStatusEnum
}

export default ({ isOpen, toggle, id, status }: Props) => {
  const dispatch = useDispatch();

  const [getStatus, setStatus] = useState<RegistrationStatusEnum>(status);
  const [getComment, setComment] = useState("");

  const { loadingUpdate, loadedUpdate } = useSelector((state: any) => {
    return {
      loadingUpdate: state.Registrations.loadingUpdate,
      loadedUpdate: state.Registrations.loadedUpdate
    }
  })


  useEffect(() => {
    dispatch(changeRootBlur(isOpen));
  }, [isOpen]);

  useEffect(() => {
    setStatus(status);
  }, [status])

  useEffect(() => {
    if(!loadingUpdate && loadedUpdate){
      close();
      setComment("")
    }
  }, [loadingUpdate, loadedUpdate])


  const close = () => {
    toggle(false);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(+e.target.value);
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }

  const handleBtnUpdate = () => {
      let resp = {
        "status": getStatus,
        "comment": getComment
      }

      dispatch(updateRegistrationStatus(id, resp));
  };


  return (
    <Modal isOpen={isOpen} toggle={close} className="modal-dialog-centered">
      <ModalHeader toggle={close} tag="h4">
        Change Status
      </ModalHeader>
      <ModalBody>

        <AvForm className="needs-validation">

          <div className="mb-3 mt-2">
            <AvField
              type="select"
              name="status"
              className="form-select"
              label="Status*"
              required
              value={String(getStatus)}
              onChange={handleChange}
            >
              {Object.entries(RegistrationStatusObj).map((val) => {
                if (val[0] !== '0') {
                  return <option key={val[0]} value={val[0]}>{val[1]}</option>;
                }
              })}
            </AvField>
          </div>

          <div className="mb-3">
            <Label> Comment* </Label>
            <AvInput
              type="textarea"
              name="comment"
              id="comment"
              placeholder="Comment"
              value={getComment}
              onChange={handleChangeComment}
              required
            />
          </div>

        </AvForm>


      </ModalBody>
      <ModalFooter>
        <Row>
          <Col>
            <div className="text-end">
              <button
                type="submit"
                className="btn btnOrange"
                onClick={handleBtnUpdate}
                disabled={loadingUpdate}
              >
                {loadingUpdate && <i className="bx bx-hourglass bx-spin me-2"/>}
                Save
              </button>
            </div>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  )

}