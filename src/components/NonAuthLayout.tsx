import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const NonAuthLayout = ({ children }: any) => {
  const { isBlur } = useSelector((state: any) => ({
    isBlur: state.Layout.isBlur,
  }));

  useEffect(() => {
    const rootBlur: any = document.getElementById("root");
    isBlur
      ? (rootBlur.style.filter = "blur(3px)")
      : rootBlur.removeAttribute("style");
  }, [isBlur]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(NonAuthLayout);
