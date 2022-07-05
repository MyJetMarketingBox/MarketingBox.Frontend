import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import SimpleBar from "simplebar-react";
import { useTranslation } from "react-i18next";
// MetisMenu
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import c from "./SidebarContent.module.scss";
import ReactDOM from "react-dom";
import Page from "src/constants/pages";
import { avaLetters } from "../../helpers/avaLetters";
import { RootStoreType } from "src/store/storeTypes";
//Import Icons
import { ReactComponent as IconMenu } from "../../assets/images/icon-menu.svg";
import { ReactComponent as IconBalance } from "../../assets/images/icon-account-balance.svg";
import { ReactComponent as IconDashboard } from "../../assets/images/icon-dashboard.svg";
import { ReactComponent as IconBrands } from "../../assets/images/icon-brands.svg";
import { ReactComponent as IconRegistrations } from "../../assets/images/icon-registration.svg";
import { ReactComponent as IconCampaigns } from "../../assets/images/icon-campaigns.svg";
import { ReactComponent as IconLeads } from "../../assets/images/icon-leads.svg";
import { ReactComponent as IconMarketingTools } from "../../assets/images/icon-marketing-tools.svg";
import { ReactComponent as IconSettings } from "../../assets/images/icons-settings.svg";
import { ReactComponent as IconRedistribution } from "../../assets/images/icon-phone-flip.svg";
//

const SidebarContent = (props: any) => {
  const ref = useRef<any>();
  const { t } = useTranslation();

  const [isOpenSubmenu, setIsOpenSubmenu] = useState<string | null>(null);
  const [isClick, setClick] = useState<boolean>(true);

  const { user, profile } = useSelector((state: RootStoreType) => ({
    user: state.authUser.userInfo,
    profile: state.Profile.data?.generalInfo
  }));

  useEffect(() => {
    if (ref.current) {
      ref.current.recalculate();
    }
  }, []);

  function scrollElement(item: any) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const subMemuClickHandler = (subMenu: string) => {
    if (subMenu !== isOpenSubmenu) {
      setIsOpenSubmenu(subMenu);
    } else {
      setIsOpenSubmenu(null);
    }
  };

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    const body = document.body;
    if (isClick) {
      body.classList.add("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "sm");
    } else {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute("data-sidebar-size", "lg");
    }
    setClick(prev => !prev);
  }

  function handleToggleMob(e: any) {
    e.preventDefault();
    const body = document.body;
    body.classList.remove("mob-menu-opened");
  }

  function tToggleMob() {
    const body = document.body;
    body.classList.toggle("mob-menu-opened");
  }

  return (
    <React.Fragment>
      <SimpleBar className={c.sidebar} ref={ref}>
        <div className={c.toggleWrapper}>
          <button onClick={tToggle} type="button" className={c.toggle}>
            <IconMenu />
          </button>
        </div>

        <div className={c.userInfo}>
          {/*<div className={c.userPhoto}>
            <img src={giftBox} width="200" height="200" alt="img" />
          </div>*/}
          <div className={c.userPhoto}>
            <div className="avatar">
              <div className="avatar_letters">
                {avaLetters(profile?.username || "U")}
              </div>
            </div>
          </div>
          <div className={c.userName}>{profile?.username || ""}</div>
          <div className={c.userId}>ID #{user?.["user-id"] || ""}</div>
        </div>

        <ul className={c.balanceItems}>
          <li className={c.balanceItem}>
            <div className={c.balanceItemIcon}>
              <IconBalance />
            </div>
            <div className={c.balanceItemContent}>
              <div className={c.balanceItemVal}>$ 0</div>
              <div className={c.balanceItemDescr}>Approved balance</div>
            </div>
          </li>
          <li className={c.balanceItem}>
            <div className={c.balanceItemIcon}>
              <IconBalance />
            </div>
            <div className={c.balanceItemContent}>
              <div className={c.balanceItemVal}>$ 0</div>
              <div className={c.balanceItemDescr}>Hold balance</div>
            </div>
          </li>
        </ul>

        <nav className={c.menu}>
          <ul className={c.menuList}>
            <li className={c.menuItem}>
              <NavLink
                to={Page.DASHBOARD}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconDashboard />
                </div>
                <div className={c.menuItemDescr}>{t("Dashboard")}</div>
              </NavLink>
            </li>
            {/*<li className={c.menuItem}>
              <NavLink
                to={Page.REPORTS}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconReports />
                </div>
                <div className={c.menuItemDescr}>{t("Reports")}</div>
              </NavLink>
            </li>*/}
            <li className={c.menuItem}>
              <NavLink
                to={Page.BRANDS}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconBrands />
                </div>
                <div className={c.menuItemDescr}>{t("Brands")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink
                to={Page.REGISTRATIONS}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconRegistrations />
                </div>
                <div className={c.menuItemDescr}>{t("Registrations")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink
                to={Page.CAMPAIGNS}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconCampaigns />
                </div>
                <div className={c.menuItemDescr}>{t("Campaigns")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink
                to={Page.AFFILIATES}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconLeads />
                </div>
                <div className={c.menuItemDescr}>{t("Affiliates")}</div>
              </NavLink>
            </li>
            <li
              className={`${c.menuItem} ${
                isOpenSubmenu === "marketing-tools" && c.isOpen
              }`}
            >
              <div
                className={c.menuItemLink}
                onClick={() => subMemuClickHandler("marketing-tools")}
              >
                <div className={c.menuItemIcon}>
                  <IconSettings />
                </div>
                <div className={c.menuItemDescr}>{t("Marketing Tools")}</div>
              </div>
              <ul className={c.subMenu}>
                <li className={c.subMenuItem}>
                  <NavLink to={Page.OFFERS} activeClassName={c.active}>
                    {t("Offers")}
                  </NavLink>
                </li>
                {/* <li className={c.subMenuItem}>
                  <NavLink to={Page.POSTBACK} activeClassName={c.active}>
                    {t("Offer Affiliates")}
                  </NavLink>
                </li> */}
              </ul>
            </li>
            {/*<li className={c.menuItem}>
              <NavLink
                to={Page.CONVERSIONS}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconConversions />
                </div>
                <div className={c.menuItemDescr}>{t("Conversions")}</div>
              </NavLink>
            </li>*/}
            <li className={c.menuItem}>
              <NavLink
                to={Page.REDISTRIBUTION}
                className={c.menuItemLink}
                activeClassName={c.active}
              >
                <div className={c.menuItemIcon}>
                  <IconRedistribution />
                </div>
                <div className={c.menuItemDescr}>{t("Redistribution")}</div>
              </NavLink>
            </li>
            <li
              className={`${c.menuItem} ${
                isOpenSubmenu === "settings" && c.isOpen
              }`}
            >
              <div
                className={c.menuItemLink}
                onClick={() => subMemuClickHandler("settings")}
              >
                <div className={c.menuItemIcon}>
                  <IconSettings />
                </div>
                <div className={c.menuItemDescr}>{t("Settings")}</div>
              </div>
              <ul className={c.subMenu}>
                <li className={c.subMenuItem}>
                  <NavLink to={Page.PAYOUTS} activeClassName={c.active}>
                    {t("Payouts")}
                  </NavLink>
                </li>
                {/*<li className={c.subMenuItem}>
                  <NavLink to={Page.POSTBACK} activeClassName={c.active}>
                    {t("Postback")}
                  </NavLink>
                </li>*/}
                <li className={c.subMenuItem}>
                  <NavLink to={Page.POSTBACK_LOGS} activeClassName={c.active}>
                    {t("Postback Logs")}
                  </NavLink>
                </li>
                <li className={c.subMenuItem}>
                  <NavLink to={Page.INTEGRATIONS} activeClassName={c.active}>
                    {t("Integrations")}
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </SimpleBar>

      {ReactDOM.createPortal(
        <div>
          <div className={c.mobMenuWrapper}>
            <SimpleBar className={c.mobMenu}>
              <ul className={c.mobMenuList}>
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.DASHBOARD}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconDashboard />
                    </div>
                    <div className={c.descr}>{t("Dashboard")}</div>
                  </NavLink>
                </li>
                {/*<li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.REPORTS}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconReports />
                    </div>
                    <div className={c.descr}>{t("Reports")}</div>
                  </NavLink>
                </li>*/}
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.BRANDS}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconBrands />
                    </div>
                    <div className={c.descr}>{t("Brands")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.REGISTRATIONS}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconRegistrations />
                    </div>
                    <div className={c.descr}>{t("Registrations")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.CAMPAIGNS}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconCampaigns />
                    </div>
                    <div className={c.descr}>{t("Campaigns")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.AFFILIATES}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                    onClick={handleToggleMob}
                  >
                    <div className={c.icon}>
                      <IconLeads />
                    </div>
                    <div className={c.descr}>{t("Affiliates")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.MARKETING_TOOLS}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconMarketingTools />
                    </div>
                    <div className={c.descr}>{t("Marketing Tools")}</div>
                  </NavLink>
                </li>
                {/*<li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.CONVERSIONS}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconConversions />
                    </div>
                    <div className={c.descr}>{t("Conversions")}</div>
                  </NavLink>
                </li>*/}
                <li className={c.mobMenuItem}>
                  <NavLink
                    to={Page.REDISTRIBUTION}
                    className={c.mobMenuItemLink}
                    activeClassName={c.active}
                  >
                    <div className={c.icon}>
                      <IconRedistribution />
                    </div>
                    <div className={c.descr}>{t("Redistribution")}</div>
                  </NavLink>
                </li>
              </ul>
            </SimpleBar>

            <button
              onClick={tToggleMob}
              type="button"
              className={c.mobMenuToggle}
            >
              <IconMenu />
            </button>
          </div>
        </div>,
        document.body
      )}
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default SidebarContent;
