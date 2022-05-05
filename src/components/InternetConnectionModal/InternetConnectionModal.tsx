import React, { useEffect, useState } from "react";

// styles
import "./internetConnectionModalStyles.scss";

const InternetConnectionModal = () => {
  const [show, setShow] = useState(false);

  const handleLostConnection = () => {
    setShow(true);
  };

  const handleSetConnection = () => {
    setShow(false);
    // window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("offline", handleLostConnection);
    window.addEventListener("online", handleSetConnection);

    return () => {
      window.removeEventListener("offline", handleLostConnection);
      window.removeEventListener("online", handleSetConnection);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="ic-modal">
      <h1>Check your internet connection...</h1>
    </div>
  );
};

export default InternetConnectionModal;
