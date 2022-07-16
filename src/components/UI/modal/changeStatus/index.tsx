import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeRootBlur } from "../../../../store/layout/actions";
import { RegistrationStatusObj } from "../../../../common/utils/model";
import { RegistrationStatusEnum } from "../../../../enums/RegistrationStatusEnum";
import * as yup from "yup";
import { useFormik } from "formik";
import ValidationText from "../../../../constants/validationText";
import LabelInput from "../../FormElements/LabelInput";
import LabelSelect from "../../FormElements/LabelSelect";
import { updateRegistrationStatus } from "../../../../store/registrations/actions";

interface IUpdateResponse {
  status: number,
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

  const { loadingUpdate, loadedUpdate } = useSelector((state: any) => {
    return {
      loadingUpdate: state.Registrations.loadingUpdate,
      loadedUpdate: state.Registrations.loadedUpdate
    }
  })

  const validationSchema: yup.SchemaOf<IUpdateResponse> = yup.object().shape({
    status: yup.number().required(ValidationText.required),
    comment: yup.string().required(ValidationText.required)
  });

  const initialValues = useCallback((): IUpdateResponse => {
    return {
      status: status || 1,
      comment: ""
    }
  }, [status]);


  const handleSubmitForm = () => {
    let resp = {
      "status": +values.status,
      "comment": values.comment
    }

    dispatch(updateRegistrationStatus(id, resp));
  }

  const {
    values,
    validateForm,
    handleChange,
    submitForm,
    handleBlur,
    errors,
    touched,
    isValid,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues: initialValues(),
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const handlerClickSubmit = async () => {
    const curErrors = await validateForm();
    const curErrorsKeys = Object.keys(curErrors);
    if (curErrorsKeys.length) {
      const el = document.getElementById(curErrorsKeys[0]);
      if (el) el.focus();
    }
    submitForm();
  };

  const toggleRootBlur = (status: boolean) => {
    dispatch(changeRootBlur(status));
  }

  useEffect(() => {
    toggleRootBlur(isOpen);
  }, [isOpen]);


  useEffect(() => {
    if(!isOpen && !loadingUpdate && loadedUpdate){
      close();
    }
  }, [isOpen, loadingUpdate, loadedUpdate])


  const close = () => {
    toggleRootBlur(false);
    toggle(false);
    resetForm();
  };


  return (
    <Modal isOpen={isOpen} toggle={close} className="modal-dialog-centered">
      <ModalHeader toggle={close} tag="h4">
        Change Status
      </ModalHeader>
      <Form className="needs-validation">
        <ModalBody>
          <div className="mb-3 mt-2">
            <LabelSelect
              value={`${values.status}`}
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Status*"
              hasError={!!(errors.status && touched.status)}
              errorText={errors.status}
            >
              {Object.entries(RegistrationStatusObj).map((val) => {
                if (val[0] !== '0') {
                  return <option key={val[0]} value={val[0]}>{val[1]}</option>;
                }
              })}
            </LabelSelect>
          </div>

          <div className="mb-3">
            <LabelInput
              label="Comment"
              placeholder="Comment*"
              name="comment"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment || ""}
              hasError={!!(errors.comment && touched.comment)}
              errorText={errors.comment}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btnOrange"
                  onClick={handlerClickSubmit}
                  disabled={!isValid || loadingUpdate}
                >
                  {loadingUpdate && <i className="bx bx-hourglass bx-spin me-2"/>}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
      </Form>
    </Modal>
  )

}