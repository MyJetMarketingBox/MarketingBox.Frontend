import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import {
  clearErrorText,
  hideReloadPopup,
  setInternetError,
  stopInternetError,
} from "src/store/actions";
import { IBadRequestStore } from "src/store/badRequests/actionTypes";

// styles
import "./internetConnectionModalStyles.scss";

const BadRequestContainer = () => {
  const dispatch = useDispatch();

  const { badRequests } = useSelector(
    (state: { badRequests: IBadRequestStore }) => ({
      badRequests: state.badRequests,
    })
  );

  const handleReload = () => {
    dispatch(hideReloadPopup());
    dispatch(clearErrorText());
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("offline", () => dispatch(setInternetError()));
    window.addEventListener("online", () => dispatch(stopInternetError()));
    return () => {
      window.removeEventListener("offline", () => dispatch(setInternetError()));
      window.removeEventListener("online", () => dispatch(stopInternetError()));
    };
  }, []);

  if (badRequests.isInternetError) {
    return (
      <div className="ic-modal">
        <h1>Check your internet connection...</h1>
      </div>
    );
  }

  if (badRequests.isRecconectPopup) {
    return (
      <Modal isOpen={true} centered size="small">
        <div className="modal-header text-center p-4 justify-content-center">
          <h4 className="m-0">Connection error</h4>
        </div>
        <div className="modal-content text-center p-4">
          <p className="mb-0">Reconnecting ...</p>
        </div>
      </Modal>
    );
  }

  if (badRequests.isReloadPopup) {
    return (
      <Modal isOpen={true} centered>
        <div className="modal-header">
          <h5 className="modal-title">Something went wrong</h5>
        </div>
        <div className="modal-body">
          <p>{badRequests.errorText || "Unknow error"}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReload}
          >
            Reload
          </button>
        </div>
      </Modal>
    );
  }

  return null;
};

export default BadRequestContainer;
