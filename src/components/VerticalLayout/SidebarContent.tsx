import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback, useState } from "react";

//Import Icons
import Icon from "@ailibs/feather-react-ts";
import { ReactComponent as IconMenu } from '../../assets/images/icon-menu.svg';
import { ReactComponent as IconBalance } from '../../assets/images/icon-account-balance.svg';
import { ReactComponent as IconDashboard } from '../../assets/images/icon-dashboard.svg';
import { ReactComponent as IconReports } from '../../assets/images/icon-reports.svg';
import { ReactComponent as IconBrands } from '../../assets/images/icon-brands.svg';
import { ReactComponent as IconRegistrations } from '../../assets/images/icon-registration.svg';
import { ReactComponent as IconCampaigns } from '../../assets/images/icon-campaigns.svg';
import { ReactComponent as IconLeads } from '../../assets/images/icon-leads.svg';

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

import c from './SidebarContent.module.scss';

const SidebarContent = (props: any) => {
  const ref = useRef<any>();

  const [isClick, setClick] = useState<boolean>(true);

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

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    var body = document.body;
    if (isClick) {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
    } else {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
    }
    setClick(prev => !prev);
  }

  return (
    <React.Fragment>
      <SimpleBar className={c.sidebar} ref={ref}>
        <div className={c.toggleWrapper}>
          <button
            onClick={() => { tToggle(); }}
            type="button"
            className={c.toggle}
          >
            <IconMenu />
          </button>
        </div>

        <div className={c.userInfo}>
          <div className={c.userPhoto}>
            <img src={giftBox} width="200" height="200" alt="img"/>
          </div>
          <div className={c.userName}>
            User Name
          </div>
          <div className={c.userId}>
            ID #13408424
          </div>
        </div>

        <ul className={c.balanceItems}>
          <li className={c.balanceItem}>
            <div className={c.balanceItemIcon}><IconBalance /></div>
            <div className={c.balanceItemContent}>
              <div className={c.balanceItemVal}>$15,000.00</div>
              <div className={c.balanceItemDescr}>Approved balance</div>
            </div>
          </li>
          <li className={c.balanceItem}>
            <div className={c.balanceItemIcon}><IconBalance /></div>
            <div className={c.balanceItemContent}>
              <div className={c.balanceItemVal}>$2,000.00</div>
              <div className={c.balanceItemDescr}>Hold balance</div>
            </div>
          </li>
        </ul>

        <nav className={c.menu}>
          <ul className={c.menuList}>
            <li className={c.menuItem}>
              <NavLink to="/dashboard" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconDashboard /></div>
                <div className={c.menuItemDescr}>{props.t("Dashboard")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink to="/reports" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconReports /></div>
                <div className={c.menuItemDescr}>{props.t("Reports")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink to="/brands" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconBrands /></div>
                <div className={c.menuItemDescr}>{props.t("Brands")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink to="/registrations" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconRegistrations /></div>
                <div className={c.menuItemDescr}>{props.t("Registrations")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink to="/campaigns" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconCampaigns /></div>
                <div className={c.menuItemDescr}>{props.t("Campaigns")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink to="/affiliates" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconLeads /></div>
                <div className={c.menuItemDescr}>{props.t("Affiliates")}</div>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
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
                <li>
                  <Link to="/integrations">{props.t("Integrations")}</Link>
                </li>
              </ul>
            </li>

          </ul>
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
