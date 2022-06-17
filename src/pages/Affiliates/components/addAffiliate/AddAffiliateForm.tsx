import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Modal, ModalHeader, ModalBody, Alert, ModalFooter } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addNewAffiliate, clearAffiliate } from "../../../../store/actions";
import { AffiliateState, Currency } from "../../../../common/utils/model";
import Loader from "../../../../components/UI/loader";

import { RootStoreType } from "src/store/storeTypes";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const { addAffLoading, addAffSuccess, addAffError, error } = useSelector(
    (state: RootStoreType) => {
      return {
        addAffLoading: state.Affiliates.addAffLoading,
        addAffSuccess: state.Affiliates.addAffSuccess,
        addAffError: state.Affiliates.addAffError,
        error: state.Affiliates.error,
      };
    }
  );

  useEffect(() => {
    if (addAffSuccess) {
      toggle();
    }
  }, [addAffSuccess]);

  useEffect(() => {
    if (addAffError) {
    }
  }, [addAffError]);

  const handleValidAffiliateSubmit = (values: any) => {
    const newAffiliate = {
      generalInfo: {
        username: values["username"],
        password: values["password"],
        email: values["email"],
        state: +values["state"],
        currency: +values["currency"],
      },
    };
    // save new aff
    dispatch(addNewAffiliate(newAffiliate));
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
        {/*addAffLoading && <Loader />*/}
        <ModalHeader toggle={toggle} tag="h4">
          Add Affiliate
        </ModalHeader>
        <AvForm
          onValidSubmit={(e: any, values: any) => {
            handleValidAffiliateSubmit(values);
          }}
        >
          <ModalBody>

              <Row form>
                <Col xs={12}>
                  {error?.isError ? (
                    <div className="mb-3">
                      <Alert color="danger">{error?.error?.errorMessage}</Alert>
                    </div>
                  ) : null}
                  <div className="mb-3">
                    <AvField
                      name="username"
                      label="Name*"
                      type="text"
                      errorMessage="Invalid name"
                      validate={{
                        required: { value: true },
                      }}
                      value={""}
                    />
                  </div>
                  <div className="mb-3">
                    <AvField
                      name="email"
                      label="Email*"
                      type="email"
                      errorMessage="Invalid Email"
                      validate={{
                        required: { value: true },
                      }}
                      value={""}
                    />
                  </div>
                  <div className="mb-3">
                    <AvField
                      name="password"
                      label="Password*"
                      type="password"
                      errorMessage="Invalid Designation"
                      validate={{
                        required: { value: true },
                      }}
                      value={""}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      type="select"
                      name="state"
                      className="form-select"
                      label="State"
                      required
                      value="0"
                    >
                      <option value={""}>Select sate</option>
                      {AffiliateState.map((val, i) => (
                        <option key={i} value={i}>
                          {val}
                        </option>
                      ))}
                    </AvField>
                  </div>

                  <div className="mb-3">
                    <AvField
                      type="select"
                      name="currency"
                      className="form-select"
                      label="Currency"
                      required
                      value="0"
                    >
                      <option value={""}>Select sate</option>
                      {Currency.map((val, i) => (
                        <option key={i} value={i}>
                          {val}
                        </option>
                      ))}
                    </AvField>
                  </div>
                </Col>
              </Row>

          </ModalBody>

          <ModalFooter>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btnOrange btn-width-250 save-user">
                    {addAffLoading && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </ModalFooter>
        </AvForm>
      </Modal>
    </>
  );
};
