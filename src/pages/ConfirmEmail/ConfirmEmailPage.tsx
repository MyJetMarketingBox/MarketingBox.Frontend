import React, { useEffect } from "react";
import Portal from "src/components/Portal";
import logo from "../../assets/images/logo.svg";
import "./ConfirmEmailPageStyles.scss";
import { useHistory, useParams } from "react-router-dom";
import Page from "src/constants/pages";
import { useSelector } from "react-redux";
import { RootStoreType } from "src/store/storeTypes";
import { AffiliateAccStatusEnum } from "src/enums/AffiliateAccStatusEnum";

const ConfirmEmailPage = () => {
  const { push } = useHistory();
  const { status } = useParams<{ status: string }>();

  const { isConfirmed } = useSelector((store: RootStoreType) => ({
    isConfirmed:
      store.AffProfile.affProfile?.generalInfo.state !==
      AffiliateAccStatusEnum.NotActive,
  }));

  const showConfirmeDone = status === "done";

  const handleClickBack = () => {
    push(showConfirmeDone ? Page.DASHBOARD : Page.SIGN_OUT);
  };

  useEffect(() => {
    if (!showConfirmeDone || isConfirmed) {
      push(Page.DASHBOARD);
    }
  }, []);

  return (
    <Portal>
      <div className="email-confirm-page">
        <div className="email-confirm-body">
          <div className="email-confirm-logo">
            <img src={logo} alt="logo" width="220" height="auto" />
          </div>
          <div className="email-confirm-title">
            <h2 className="text-orange">Congratulation!</h2>
          </div>

          <div className="email-confirm-text">
            <p>
              You've {showConfirmeDone ? "confirmed" : "created"} an account!
              <br />
              {!showConfirmeDone &&
                "Please, check you email to complete verification"}
            </p>
          </div>

          <div className="email-confirm-buttons">
            <button onClick={handleClickBack} className="auth-page-btn">
              Back to {showConfirmeDone ? "Dashbord" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmEmailPage;
