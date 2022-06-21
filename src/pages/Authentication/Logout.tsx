import React, { useEffect } from "react";

import { logoutUserAction } from "../../store/actions";

//redux
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Loader from "src/components/UI/loader";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mount = true;
    if (mount) {
      dispatch(logoutUserAction(history));
    }
    return () => {
      mount = false;
    };
  }, []);

  return <Loader />;
};

export default Logout;
