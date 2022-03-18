import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback } from "react";

//Import Icons
import Icon from "@ailibs/feather-react-ts";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//Import images
import giftBox from "../../assets/images/users/avatar-3.jpg";

//i18n
import { withTranslation } from "react-i18next";

// MetisMenu
import MetisMenu from "metismenujs";
import { NavLink, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarContent = (props: any) => {
  const ref = useRef<any>();

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);


  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul: any = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item: any) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }


  const { user } = useSelector((state: any) => ({
    user: state.login.userInfo
  }));


  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">

            <li className="menu-title">{props.t("Menu")} </li>

            <li>
              <Link to="/dashboard" className="">
                <Icon name="home" />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/reports" className="">
                <Icon name="file-text" />
                <span>{props.t("Reports")}</span>
              </Link>
            </li>

            {(user && user.role != "affiliatesManager" && user.role != "Affiliate") ?
              (<li>
                <Link to="/brands" className="">
                  <Icon name="grid" />
                  <span>{props.t("Brands")}</span>
                </Link>
              </li>)
              : (<li></li>)
            }

            <li>
              <Link to="/registrations" className="">
                <Icon name="user-plus" />
                <span>{props.t("Registrations")}</span>
              </Link>
            </li>

            <li>
              <Link to="/campaigns" className="">
                <Icon name="box" />
                <span>{props.t("Campaigns")}</span>
              </Link>
            </li>

            {user && user.role != "Affiliate" ? (<li>
              <NavLink to="/Affiliates" className="">
                <Icon name="briefcase"/>
                <span>{props.t("Affiliates")}</span>
              </NavLink>
            </li>):(<li></li>)}

            <li>
              <Link to="/marketing_tools" className="">
                <Icon name="cpu" />
                <span>{props.t("Marketing Tools")}</span>
              </Link>
            </li>

            {user && user.role != "Affiliate" ? (<li>
              <Link to="/conversions" className="">
                <Icon name="filter" />
                <span>{props.t("Conversions")}</span>
              </Link>
            </li>):(<li></li>)}

            <li>
              <Link to="/settings" className="">
                <Icon name="settings" />
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/postback">{props.t("Postback")}</Link>
                </li>
                <li>
                  <Link to="/postback_logs">{props.t("Postback Logs")}</Link>
                </li>
                {( user && user.role != "affiliatesManager" && user.role != "Affiliate") ?
                (<li>
                  <Link to="/re_registering">{props.t("Registering")}</Link>
                </li>) : (<li></li>)
                }
              </ul>
            </li>

          </ul>
          <div className="card sidebar-alert border-0 text-center mx-4 mb-0 mt-5">
            <div className="card-body">
              <img src={giftBox} alt="" width="100"/>
              <div className="mt-4">
                <h5 className="text-orange font-size-16">
                  Your manager
                </h5>
                <p className="font-size-13">
                  Write for all questions.
                </p>
                <a href="#!" className="btn btn-success mt-2">
                  Write!
                </a>
              </div>
            </div>
          </div>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withTranslation()(withRouter(SidebarContent));
