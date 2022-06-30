import React from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";
import logoSvg from "../../assets/images/logo.svg";
import logoWhiteSvg from "../../assets/images/logo-white.svg";
import { useSelector } from "react-redux";
import Page from "../../constants/pages";

import "react-drawer/lib/react-drawer.css";
import c from "./Header.module.scss";

const Header = (props: any) => {
  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  return (
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
          {/*<NotificationDropdown />*/}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
