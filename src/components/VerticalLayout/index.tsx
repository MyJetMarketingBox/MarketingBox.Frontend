import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  changelayoutMode,
  loginSuccess,
  getCountries,
} from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";

//redux
import { useSelector, useDispatch } from "react-redux";
import parseJwt from "../../common/utils/parse";
import { ToastContainer } from "react-toastify";
import { LOCAL_STORAGE_AUTH_USER, LOCAL_STORAGE_LAYOUT_THEME } from "../../constants/localStorageKeys";

const Layout = (props: any) => {
  const dispatch = useDispatch();

  const {
    isPreloader,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    leftSideBarTheme,
    layoutMode,
    layoutType,
    leftSidebarTypes,
    loadedCountries,
    isBlur,
  } = useSelector((state: any) => ({
    isPreloader: state.Layout.isPreloader,
    leftSideBarType: state.Layout.leftSideBarType,
    layoutWidth: state.Layout.layoutWidth,
    topbarTheme: state.Layout.topbarTheme,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
    layoutMode: state.Layout.layoutMode,
    layoutType: state.Layout.layoutType,
    leftSidebarTypes: state.Layout.leftSidebarTypes,
    loadedCountries: state.Countries.loaded,
    isBlur: state.Layout.isBlur,
  }));

  const isMobile: any = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    // if (leftSideBarType === "default") {
    //   dispatch(changeSidebarType("condensed"));
    // } else if (leftSideBarType === "condensed") {
    //   dispatch(changeSidebarType("default"));
    // }
  };

  /*
  layout  settings
  */

  // useEffect(() => {
  //   const preloader: any = document.getElementById("preloader");
  //   const status: any = document.getElementById("status");

  //   if (isPreloader === true) {
  //     preloader.style.display = "block";
  //     status.style.display = "block";

  //     setTimeout(function () {
  //       preloader.style.display = "none";
  //       status.style.display = "none";
  //     }, 2500);
  //   } else {
  //     preloader.style.display = "none";
  //     status.style.display = "none";
  //   }
  // }, [isPreloader]);

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
    if(localStorage.getItem(LOCAL_STORAGE_LAYOUT_THEME)){
      dispatch(changelayoutMode(localStorage.getItem(LOCAL_STORAGE_LAYOUT_THEME), layoutType));
    }
  }, [])

  if (localStorage.getItem(LOCAL_STORAGE_AUTH_USER)) {
    // @ts-ignore
    const authUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    const userInfo = parseJwt(JSON.stringify(authUser.token));

    useSelector((state: any) => {
      state.login.userInfo = userInfo;
    });
  }

  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />

      <div id="layout-wrapper">
        <Header
          toggleMenuCallback={toggleMenuCallback}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Sidebar />
        <div className="main-content">{props.children}</div>
      </div>
    </React.Fragment>
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
