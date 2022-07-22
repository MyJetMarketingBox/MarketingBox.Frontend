import MetaTags from "react-meta-tags";
import React, { useState } from "react";
import { Alert, Col } from "reactstrap";
//redux
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams, withRouter } from "react-router-dom";
// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation";
// action
import { userResetPassword } from "../../store/actions";
// import images
import logo from "../../assets/images/logo-sm.svg";
import Page from "src/constants/pages";
import ValidationText from "src/constants/validationText";

interface Props {}

const ResetPassword = ({}: Props) => {
  const { token } = useParams<{ token: string }>();

  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const passToggleHandler = () => {
    setShowPass(prev => !prev);
  };
  const { isLoading, resetError, resetPasswordSuccess } = useSelector(
    (state: any) => ({
      resetError: state.forgetPassword.resetPasswordError,
      isLoading: state.forgetPassword.resetLoading,
      resetPasswordSuccess: state.forgetPassword.resetPasswordSuccess,
    })
  );

  const handleValidSubmit = (e: any, values: any) => {
    dispatch(userResetPassword({ token, newPassword: values.newPassword }));
  };

  return (
    <React.Fragment>
      <MetaTags>Forget Password | TraffMe</MetaTags>

      <div className="container-fluid">
        <div className="auth-page row">
          <div className="d-flex align-items-center justify-content-center auth-page-form-wrapper col-12 col-lg-6">
            <div className="auth-page-form-body">
              <div className="auth-page-logo text-center">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img src={logo} alt="FoxOffers" width="164" height="auto" />
                </Link>
              </div>
              <div className="auth-content">
                <h5 className="auth-page-title">Set new password</h5>
                <p className="auth-page-descr">Select your new password</p>
                {resetError && <Alert color="danger">{resetError}</Alert>}
                {resetPasswordSuccess ? (
                  <Alert>{resetPasswordSuccess}</Alert>
                ) : (
                  <AvForm
                    className="custom-form"
                    onValidSubmit={handleValidSubmit}
                  >
                    <div className="mb-3">
                      <div className="auth-page-form-pass">
                        <div
                          className="auth-page-form-pass-toggle"
                          onClick={passToggleHandler}
                        >
                          {showPass ? "HIDE" : "SHOW"}
                        </div>

                        <Col className="mb-3">
                          <AvField
                            name="newPassword"
                            value=""
                            type={showPass ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter new password"
                            disabled={!!resetPasswordSuccess}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: ValidationText.required,
                              },
                              minLength: {
                                value: 8,
                                errorMessage: ValidationText.minLength8,
                              },
                              maxLength: {
                                value: 50,
                                errorMessage: ValidationText.maxLength50,
                              },
                              pattern: {value: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*?[!@#$%^&*()_+<>?"\':;/\\\\|{}\\[\\]~`\\-=,.])[A-Za-z\\d!@#$%^&*()_+<>?"\':;/\\\\|{}\\[\\]~`\\-=,.]{6,}$/', errorMessage: ValidationText.passwordMask},
                            }}
                          />
                        </Col>

                        <AvField
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm new password"
                          type="password"
                          required
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
                      </div>
                    </div>
                    <div>
                      <button
                        className="auth-page-btn"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <i className="bx bx-hourglass bx-spin me-2" />
                        ) : (
                          "Change password"
                        )}
                      </button>
                    </div>
                  </AvForm>
                )}
                <div className="auth-page-form-descr text-center">
                  Back to &nbsp;
                  <Link to={Page.SIGN_IN} className="text-orange fw-semibold">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-page-img d-none d-lg-block col-lg-6" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ResetPassword);
