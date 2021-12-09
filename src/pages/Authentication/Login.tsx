import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React from "react";

import { Row, Col, Alert, Container } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser} from "../../store/actions";

// import images
import logo from "../../assets/images/logo-sm.svg";
import BgImage from 'src/assets/images/bg-3.jpg';


interface LoginProps {
  history: object;
}

const Login = ({ history }: LoginProps) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: any) => ({
    error: state.login.error,
  }));

  // handleValidSubmit
  const handleValidSubmit = (event: any, values: any) => {
    // console.log(event);
    // console.log(values);
    // console.log(loginUser(values, history));
    // return;
    dispatch(loginUser(values, history));
  };

  // const signIn = (res: any, type: any) => {
  //   if (type === "google" && res) {
  //     const postData = {
  //       name: res.profileObj.name,
  //       email: res.profileObj.email,
  //       token: res.tokenObj.access_token,
  //       idToken: res.tokenId,
  //     };
  //     dispatch(socialLogin(postData, history, type));
  //   } else if (type === "facebook" && res) {
  //     const postData = {
  //       name: res.name,
  //       email: res.email,
  //       token: res.accessToken,
  //       idToken: res.tokenId,
  //     };
  //     dispatch(socialLogin(postData, history, type));
  //   }
  // };

  //handleGoogleLoginResponse
  // const googleResponse = (response: Object) => {
  //   signIn(response, "google");
  // };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  // const facebookResponse = (response: Object) => {
  //   signIn(response, "facebook");
  // };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | TraffMe - Dashboard</title>
      </MetaTags>
      
      <div className="auth-page">
        <Container fluid className="p-0">
          
            <Col className="auth-center">
              <div className="auth-full-page-content d-flex">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="150" />{" "}
                      </Link>
                    </div>
                    <div className="auth-content">
                      <div className="text-center">
                        <h5 className="mb-0 text-white">Welcome Back !</h5>
                        <p className="mt-2 text-white">
                          Sign in to continue to TraffMe.
                        </p>
                      </div>
                      <AvForm
                        className="custom-form mt-2 pt-2"
                        onValidSubmit={(e: any, v: any) => {
                          handleValidSubmit(e, v);
                        }}
                      >
                        {error ? <Alert color="danger">{error}</Alert> : null}
                        <div className="flex-grow-1">
                          <label className="form-label text-white">Email</label>
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="email"
                            value="admin@gm.com"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <label className="form-label text-white">Password</label>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link
                                  to="/auth-recoverpw"
                                  className="text-white"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              value="123456"
                              type="password"
                              className="form-control"
                              required
                              placeholder="Enter Password"
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember-check"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="remember-check"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btnOrange w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </AvForm>

                      <div className="mt-2 text-center text-white">
                        <p className="text-white mb-0">
                          Don't have an account ?{" "}
                          <Link
                            to="/register"
                            className="text-orange fw-semibold"
                          >
                            {" "}
                            Signup now{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="mt-md-3 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} TraffMe .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <div
            style={{ backgroundImage: `url(${BgImage})` }}
            className={`authBg pt-md-5 p-4 d-flex`}
            >
                <div className="bgOverlay" />
            </div>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
