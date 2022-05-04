import React, { useState } from "react";
import { Link } from "react-router-dom";

//import drawer
import "react-drawer/lib/react-drawer.css";

//import component
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";

import c from "./Header.module.scss";

//import images
import logoSvg from "../../assets/images/logo.svg";
import logoWhiteSvg from "../../assets/images/logo-white.svg";

//redux
import { useSelector } from "react-redux";
import Page from "src/constants/pages";

const Header = (props: any) => {
  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className={c.body}>
          <Link to={Page.DASHBOARD} className={c.logo}>
            <img
              src={logoSvg}
              className={c.light}
              width="165"
              height="42"
              alt="FoxOffers"
            />
            <img
              src={logoWhiteSvg}
              className={c.dark}
              width="165"
              height="42"
              alt="FoxOffers"
            />
          </Link>
          <div className="d-flex">
            <LightDark
              layoutMode={layoutMode}
              onChangeLayoutMode={props.onChangeLayoutMode}
            />
            <NotificationDropdown />
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
