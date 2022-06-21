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

  const { isConfirmed, isAuth } = useSelector((store: RootStoreType) => ({
    isAuth: store.authUser.isAuthorization,

    isConfirmed:
      store.AffProfile.affProfile?.generalInfo.state ===
        AffiliateAccStatusEnum.Active ||
      store.AffProfile.affProfile?.generalInfo.state ===
        AffiliateAccStatusEnum.Banned,
  }));

  const showConfirmeDone = status === "done";
  const confirmEmailFailed = status === "fail";

  const handleClickBack = () => {
    let link: string = "";
    if (isAuth) {
      link = showConfirmeDone ? Page.DASHBOARD : Page.SIGN_OUT;
    } else {
      link = Page.SIGN_IN;
    }
    push(link);
  };

  useEffect(() => {
    if (!status && isConfirmed) {
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
            <h2 className="text-orange">
              {confirmEmailFailed
                ? "Your confirmation is failing"
                : "Congratulation!"}
            </h2>
          </div>

          <div className="email-confirm-text">
            {!confirmEmailFailed && (
              <>
                <p>
                  You've {showConfirmeDone ? "confirmed" : "created"} an
                  account!
                  <br />
                  {!showConfirmeDone &&
                    "Please, check you email to complete verification"}
                </p>
              </>
            )}
          </div>

          <div className="email-confirm-buttons">
            <button onClick={handleClickBack} className="auth-page-btn">
              Back to&nbsp;
              {showConfirmeDone ? (isAuth ? "Dashbord" : "Log In") : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmEmailPage;
