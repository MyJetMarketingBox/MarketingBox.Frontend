import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { changelayoutMode } from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";

//redux
import { useSelector, useDispatch } from "react-redux";
import parseJwt from "../../common/utils/parse";
import { ToastContainer } from "react-toastify";
import {
  LOCAL_STORAGE_AUTH_USER,
  LOCAL_STORAGE_LAYOUT_THEME,
} from "../../constants/localStorageKeys";

const Layout = (props: any) => {
  const dispatch = useDispatch();

  const { layoutType, isBlur } = useSelector((state: any) => ({
    layoutType: state.Layout.layoutType,
    isBlur: state.Layout.isBlur,
  }));

  const toggleMenuCallback = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const rootBlur: any = document.getElementById("root");
    isBlur
      ? (rootBlur.style.filter = "blur(3px)")
      : rootBlur.removeAttribute("style");
  }, [isBlur]);

  const onChangeLayoutMode = (value: any) => {
    if (changelayoutMode) {
      dispatch(changelayoutMode(value, layoutType));
    }
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_LAYOUT_THEME)) {
      dispatch(
        changelayoutMode(
          localStorage.getItem(LOCAL_STORAGE_LAYOUT_THEME),
          layoutType
        )
      );
    }
  }, []);

  return (
    <div id="layout-wrapper">
      <Header
        toggleMenuCallback={toggleMenuCallback}
        onChangeLayoutMode={onChangeLayoutMode}
      />
      <Sidebar />
      <div className="main-content">{props.children}</div>
    </div>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
  changelayoutMode: PropTypes.func,
};

export default Layout;
