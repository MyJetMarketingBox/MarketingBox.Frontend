import React, { useRef } from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useDispatch, useSelector } from "react-redux";
import { profileChangePassword } from "src/store/affiliates/profile/actions";
import { RootStoreType } from "src/store/storeTypes";
import ValidationText from "src/constants/validationText";

const ProfileChangePassword = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const { changePasswordLoading } = useSelector((store: RootStoreType) => ({
    changePasswordLoading: store.AffProfile.changePasswordLoading,
  }));

  const handleValidSubmit = (e: any, values: any) => {
    dispatch(profileChangePassword(values));
    formRef.current?.reset();
  };

  return (
    <>
      <h4 className="card-title mb-4">Change password</h4>
      <Card>
        <CardBody>
          <AvForm
            className="form-horizontal"
            onValidSubmit={handleValidSubmit}
            ref={formRef}
          >
            <Row>
              <Col xs={12} md={4} className="mb-3">
                <AvField
                  name="oldPassword"
                  label="Old password"
                  className="form-control"
                  placeholder="Enter old password"
                  type="password"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: ValidationText.required,
                    },
                  }}
                />
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <AvField
                  name="newPassword"
                  label="New password"
                  className="form-control"
                  placeholder="Enter new password"
                  type="password"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: ValidationText.required,
                    },
                    minLength: {
                      value: 8,
                      errorMessage: ValidationText.shortPassword,
                    },
                    maxLength: {
                      value: 50,
                      errorMessage: ValidationText.longPassword,
                    },
                  }}
                />
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <AvField
                  name="confirmPassword"
                  label="Confirm password"
                  className="form-control"
                  placeholder="Enter new password"
                  type="password"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: ValidationText.required,
                    },
                    match: {
                      value: "newPassword",
                      errorMessage: ValidationText.matchPassword,
                    },
                  }}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12} className="mb-3">
                <Button
                  className="btnOrange float-end btn-width-250"
                  type="submit"
                  disabled={changePasswordLoading}
                >
                  {changePasswordLoading && (
                    <i className="bx bx-hourglass bx-spin me-2" />
                  )}
                  Update
                </Button>
              </Col>
            </Row>
          </AvForm>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfileChangePassword;
