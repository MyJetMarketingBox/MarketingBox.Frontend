import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { withRouter, Link } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

//redux
import { useSelector } from "react-redux";

import c from './ProfileMenu.module.scss';
import { LOCAL_STORAGE_AUTH_USER } from "../../../constants/localStorageKeys";

const ProfileMenu = (props: any) => {
  const { success } = useSelector((state: any) => ({
    success: state.profile.success,
  }));

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState<boolean>(false);

  const [username, setusername] = useState("Admin");

  const dropdownClickHandler = () => {
    setMenu(prev => !prev);
  }

  useEffect(() => {
    const getAuthUser = localStorage.getItem(LOCAL_STORAGE_AUTH_USER);
    if (getAuthUser) {
        const obj = JSON.parse(getAuthUser);
        setusername(obj.username);
    }
  }, [success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={dropdownClickHandler}
        className="d-flex"
      >
        <DropdownToggle
          className={c.toggle}
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            src={user1}
            alt="Header Avatar"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href="/#">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};
export default withTranslation()(withRouter(ProfileMenu));
