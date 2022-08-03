import React, { ChangeEvent, useEffect, useState } from "react";
import { RedistributionStatusEnum } from "../../../../enums/RedistributionStatusEnum";
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { changeRootBlur } from "../../../../store/layout/actions";
import { useDispatch, useSelector } from "react-redux";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { RedistributionStatusObj } from "../../../../common/utils/model";
import { updateRedistributionStatus } from "../../../../store/redistribution/actions";

interface Props {
  isOpen: boolean,
  toggle: (toggle: boolean) => void,
  id: number,
  status: RedistributionStatusEnum
}

const changeStatusRedistribution = ({ isOpen, toggle, id, status }: Props) => {
  const dispatch = useDispatch();

  const [getStatus, setStatus] = useState<RedistributionStatusEnum>(status);

  const { loadingUpdate, loadedUpdate } = useSelector((state: any) => {
    return {
      loadingUpdate: state.Redistribution.loadingUpdate,
      loadedUpdate: state.Redistribution.loadedUpdate
    }
  })

  useEffect(() => {
    dispatch(changeRootBlur(isOpen));
  }, [isOpen]);

  useEffect(() => {
    (status === 3 || status === 0)
      ? setStatus(0)
      : setStatus(status);
  }, [status])

  useEffect(() => {
    if(!loadingUpdate && loadedUpdate){
      close();
    }
  }, [loadingUpdate, loadedUpdate])


  const close = () => {
    toggle(false);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(+e.target.value);
  };

  const handleBtnUpdate = () => {
    dispatch(updateRedistributionStatus({"redistributionId": id,  "status": getStatus}));
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
                <option key="0" value="">Select status...</option>
                {Object.entries(RedistributionStatusObj).map((val) => {
                  if (val[0] !== '0' && val[0] !== "3") {
                    return <option key={val[0]} value={val[0]}>{val[1]}</option>;
                  }
                })}
              </AvField>
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
                  disabled={getStatus === 0 || loadingUpdate}
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

export default changeStatusRedistribution;