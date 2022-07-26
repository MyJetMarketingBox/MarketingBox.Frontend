import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Col, Container, Form, Row } from "reactstrap";

//import images
import logo from "../../assets/images/logo-sm.svg";
import avatar from "../../assets/images/users/avatar-1.jpg";
import Page from "../../constants/pages";
import { useSelector } from "react-redux";
import { RootStoreType } from "../../store/storeTypes";

const LockScreen = () => {

  const { profile } = useSelector((state: RootStoreType) => {
    return {
      profile: state.Profile.data?.generalInfo
    }
  });

  useEffect(() => {
    console.log(profile);
  }, [profile])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Lock Screen | TraffMe</title>
      </MetaTags>

      <div className="container-fluid">
        <div className="auth-page row">
          <div className="d-flex align-items-center justify-content-center auth-page-form-wrapper col-12 col-lg-6">

            <div className="auth-page-form-body">
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4 mb-md-5 text-center">
                    <Link to="/dashboard" className="d-block auth-logo">
                      <img src={logo} alt="" height="164" />{" "}
                    </Link>
                  </div>
                  <div className="auth-content my-auto">
                    <div className="text-center">
                      <h5 className="auth-page-title">Lock screen</h5>
                      <p className="text-muted mt-2">
                        Enter your password to unlock the screen!
                      </p>
                    </div>
                    <div className="user-thumb text-center mb-4 mt-4 pt-2">
                      <img
                        src={avatar}
                        className="rounded-circle img-thumbnail avatar-lg"
                        alt="thumbnail"
                      />
                      <h5 className="font-size-15 mt-3">Shawn</h5>
                    </div>

                    <Form className="custom-form mt-4">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="mb-3 mt-4">
                        <button
                          className="auth-page-btn"
                          type="submit"
                        >
                          Unlock
                        </button>
                      </div>
                    </Form>

                    <div className="mt-5 text-center auth-page-form-descr">
                      <p className="text-muted mb-0">
                        Not you ? return{" "}
                        <Link
                          to={Page.SIGN_IN}
                          className="text-orange fw-semibold"
                        >
                          {" "}
                          Sign In{" "}
                        </Link>{" "}
                      </p>
                    </div>
                  </div>

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

export default LockScreen;
