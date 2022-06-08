import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useEffect, useState } from "react";
import { Row, Col, Alert, Container } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import {
  userForgetPassword,
  userForgotPasswordClearStore,
} from "../../store/actions";

// import images
import logo from "../../assets/images/logo-sm.svg";
import Page from "src/constants/pages";
import { values } from "lodash";

interface Props {}

const ForgetPasswordPage = ({}: Props) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const { forgetError, forgetSuccessMsg } = useSelector((state: any) => ({
    forgetError: state.forgetPassword.forgetError,
    forgetSuccessMsg: state.forgetPassword.forgetSuccessMsg,
  }));

  const handleValidSubmit = (e: any, values: any) => {
    setLoading(true);
    dispatch(userForgetPassword(values.email));
  };

  useEffect(() => {
    return () => {
      dispatch(userForgotPasswordClearStore());
    };
  }, []);

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
                <h5 className="auth-page-title">Forgot password</h5>
                <p className="auth-page-descr">
                  {!forgetSuccessMsg && "We send recovery link to your email."}
                </p>
                {forgetSuccessMsg ? (
                  <>
                    <Alert>{forgetSuccessMsg}</Alert>
                  </>
                ) : (
                  <AvForm
                    className="custom-form"
                    onValidSubmit={handleValidSubmit}
                  >
                    <div className="mb-3">
                      <AvField
                        name="email"
                        className="form-control"
                        value=""
                        placeholder="Enter your email"
                        type="email"
                        required
                      />
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
                          "Send email"
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

export default withRouter(ForgetPasswordPage);
