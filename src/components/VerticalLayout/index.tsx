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
import { LOCAL_STORAGE_AUTH_USER } from "../../constants/localStorageKeys";

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

  useEffect(() => {
    const preloader: any = document.getElementById("preloader");
    const status: any = document.getElementById("status");

    if (isPreloader === true) {
      preloader.style.display = "block";
      status.style.display = "block";

      setTimeout(function () {
        preloader.style.display = "none";
        status.style.display = "none";
      }, 2500);
    } else {
      preloader.style.display = "none";
      status.style.display = "none";
    }
  }, [isPreloader]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   dispatch(changeLayout("vertical"));
  // }, [dispatch]);

  useEffect(() => {
    const rootBlur: any = document.getElementById("root");
    isBlur
      ? (rootBlur.style.filter = "blur(3px)")
      : rootBlur.removeAttribute("style");
  }, [isBlur]);

  // useEffect(() => {
  //   if (leftSideBarTheme) {
  //     dispatch(changeSidebarTheme(leftSideBarTheme));
  //   }
  // }, [leftSideBarTheme, dispatch]);

  // useEffect(() => {
  //   if (layoutMode) {
  //     dispatch(changelayoutMode(layoutMode, layoutType));
  //   }
  // }, [layoutMode, dispatch]);

  // useEffect(() => {
  // if (leftSidebarTypes) {
  //   dispatch(changeSidebarType(leftSidebarTypes));
  // }
  // }, [leftSidebarTypes, dispatch]);

  // useEffect(() => {
  //   if (layoutWidth) {
  //     dispatch(changeLayoutWidth(layoutWidth));
  //   }
  // }, [layoutWidth, dispatch]);

  // useEffect(() => {
  // if (leftSideBarType) {
  //   dispatch(changeSidebarType(leftSideBarType));
  // }
  // }, [leftSideBarType, dispatch]);

  // useEffect(() => {
  //   if (topbarTheme) {
  //     dispatch(changeTopbarTheme(topbarTheme));
  //   }
  // }, [topbarTheme, dispatch]);

  /*
  call dark/light mode
  */
  const onChangeLayoutMode = (value: any) => {
    if (changelayoutMode) {
      dispatch(changelayoutMode(value, layoutType));
    }
  };

  // useEffect(() => {
  //   if(!loadedCountries)
  //     dispatch(getCountries("", { limit: 300 }))
  // }, [])

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
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header
          toggleMenuCallback={toggleMenuCallback}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Sidebar
          theme={leftSideBarTheme}
          type={leftSideBarType}
          isMobile={isMobile}
        />
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
