import React, { useState } from "react";
import { Link } from "react-router-dom";

//import drawer
import ReactDrawer from "react-drawer";
import "react-drawer/lib/react-drawer.css";

//import component
import RightSidebar from "../CommonForBoth/RightSidebar";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import LightDark from "../CommonForBoth/Menus/LightDark";

import c from './Header.module.scss';

//import images
import logoSvg from "../../assets/images/logo.svg";
import logoWhiteSvg from "../../assets/images/logo-white.svg";

//redux
import { useSelector } from "react-redux";

const Header = (props: any) => {
  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  const [search, setsearch] = useState<boolean>(false);
  const [socialDrp, setsocialDrp] = useState<boolean>(false);
  const [position, setPosition] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  /**
   * Rightsidebar drawer
   */
  const toggleTopDrawer = () => {
    setPosition("right");
    setOpen(!open);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className={c.body}>
          <Link to="/dashboard" className={c.logo}>
            <img src={logoSvg} className={c.light} width="165" height="42" alt="FoxOffers" />
            <img src={logoWhiteSvg} className={c.dark} width="165" height="42" alt="FoxOffers" />
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
      <ReactDrawer open={open} position={position}>
        <RightSidebar
          onClose={onDrawerClose}
          onChangeLayoutMode={props.onChangeLayoutMode}
        />
      </ReactDrawer>
    </React.Fragment>
  );
};

export default Header;
