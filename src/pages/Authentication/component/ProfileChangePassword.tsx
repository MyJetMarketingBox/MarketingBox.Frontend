import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useDispatch } from "react-redux";
import { profileChangePassword } from "src/store/affiliates/profile/actions";

const ProfileChangePassword = () => {
  const dispatch = useDispatch();

  const handleValidSubmit = (e: any, values: any) => {
    dispatch(profileChangePassword(values));
  };

  return (
    <>
      <h4 className="card-title mb-4">Change password</h4>
      <Card>
        <CardBody>
          <AvForm className="form-horizontal" onValidSubmit={handleValidSubmit}>
            <Row>
              <Col xs={12} md={3} className="mb-3">
                <AvField
                  name="oldPassword"
                  label="Old password"
                  value=""
                  className="form-control"
                  placeholder="Enter old password"
                  type="password"
                  required
                />
              </Col>
              <Col xs={12} md={3} className="mb-3">
                <AvField
                  name="newPassword"
                  label="New password"
                  value=""
                  className="form-control"
                  placeholder="Enter new password"
                  type="password"
                  required
                  validate={{
                    minLength: {
                      value: 8,
                      errorMessage:
                        "Password must be between 8 and 32 characters",
                    },
                    maxLength: {
                      value: 32,
                      errorMessage:
                        "Password must be between 8 and 32 characters",
                    },
                  }}
                />
              </Col>
              <Col xs={12} md={3} className="mb-3">
                <AvField
                  name="confirmPassword"
                  label="Confirm password"
                  value=""
                  className="form-control"
                  placeholder="Enter new password"
                  type="password"
                  validate={{
                    match: {
                      value: "newPassword",
                      errorMessage: "Must matching with new password",
                    },
                  }}
                />
              </Col>
              <Col xs={12} md={3} className="mb-3">
                <Button
                  type="submit"
                  color="danger"
                  className="w-100"
                  style={{ height: "56px", marginTop: "30px" }}
                >
                  Change password
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
