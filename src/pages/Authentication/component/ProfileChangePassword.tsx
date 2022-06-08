import React from "react";
import { Card, CardBody, Button } from "reactstrap";
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
            <div className="form-group">
              <AvField
                name="oldPassword"
                label="Old password"
                value=""
                className="form-control"
                placeholder="Enter old password"
                type="password"
                required
              />
              <br />
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
            </div>
            <div className="text-center mt-4">
              <Button type="submit" color="danger">
                Change password
              </Button>
            </div>
          </AvForm>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfileChangePassword;
