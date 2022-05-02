import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

//Import Icons
import { ReactComponent as IconMenu } from '../../assets/images/icon-menu.svg';
import { ReactComponent as IconBalance } from '../../assets/images/icon-account-balance.svg';
import { ReactComponent as IconDashboard } from '../../assets/images/icon-dashboard.svg';
import { ReactComponent as IconReports } from '../../assets/images/icon-reports.svg';
import { ReactComponent as IconBrands } from '../../assets/images/icon-brands.svg';
import { ReactComponent as IconRegistrations } from '../../assets/images/icon-registration.svg';
import { ReactComponent as IconCampaigns } from '../../assets/images/icon-campaigns.svg';
import { ReactComponent as IconLeads } from '../../assets/images/icon-leads.svg';
import { ReactComponent as IconMarketingTools } from '../../assets/images/icon-marketing-tools.svg';
import { ReactComponent as IconConversions } from '../../assets/images/icon-conversions.svg';
import { ReactComponent as IconSettings } from '../../assets/images/icons-settings.svg';

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//Import images
import giftBox from "../../assets/images/users/joker-1.gif";

//i18n
import { withTranslation } from "react-i18next";

// MetisMenu
import { NavLink, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import c from './SidebarContent.module.scss';
import ReactDOM from "react-dom";

const SidebarContent = (props: any) => {
  const ref = useRef<any>();

  const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);
  const [isClick, setClick] = useState<boolean>(true);
  const [isClickMob, setClickMob] = useState<boolean>(true);

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

  const subMemuClickHandler = () => {
    setIsOpenSubmenu(prev => !prev);
  }

  const resizeHandler = () => {

  }

  useEffect(() => {

  }, []);

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

  function tToggleMob() {
    const body = document.body;
    body.classList.toggle("mob-menu-opened");
  }

  return (
    <React.Fragment>
      <SimpleBar className={c.sidebar} ref={ref}>
        <div className={c.toggleWrapper}>
          <button
            onClick={tToggle}
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
            {user['user-name']}
          </div>
          <div className={c.userId}>
            ID #{user['user-id']}
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
            <li className={c.menuItem}>
              <NavLink to="/marketing_tools" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconMarketingTools /></div>
                <div className={c.menuItemDescr}>{props.t("Marketing Tools")}</div>
              </NavLink>
            </li>
            <li className={c.menuItem}>
              <NavLink to="/conversions" className={c.menuItemLink} activeClassName={c.active}>
                <div className={c.menuItemIcon}><IconConversions /></div>
                <div className={c.menuItemDescr}>{props.t("Conversions")}</div>
              </NavLink>
            </li>
            <li className={`${c.menuItem} ${isOpenSubmenu && c.isOpen}`}>
              <div className={c.menuItemLink} onClick={subMemuClickHandler}>
                <div className={c.menuItemIcon}><IconSettings /></div>
                <div className={c.menuItemDescr}>{props.t("Settings")}</div>
              </div>
              <ul className={c.subMenu}>
                <li className={c.subMenuItem}>
                  <NavLink to="/payouts" activeClassName={c.active}>
                    {props.t("Payouts")}
                  </NavLink>
                </li>
                <li className={c.subMenuItem}>
                  <NavLink to="/postback" activeClassName={c.active}>
                    {props.t("Postback")}
                  </NavLink>
                </li>
                <li className={c.subMenuItem}>
                  <NavLink to="/postback_logs" activeClassName={c.active}>
                    {props.t("Postback Logs")}
                  </NavLink>
                </li>
                <li className={c.subMenuItem}>
                  <NavLink to="/re_registering" activeClassName={c.active}>
                    {props.t("Registering")}
                  </NavLink>
                </li>
                <li className={c.subMenuItem}>
                  <NavLink to="/integrations" activeClassName={c.active}>
                    {props.t("Integrations")}
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
                  <NavLink to="/dashboard" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconDashboard /></div>
                    <div className={c.descr}>{props.t("Dashboard")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/reports" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconReports /></div>
                    <div className={c.descr}>{props.t("Reports")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/brands" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconBrands /></div>
                    <div className={c.descr}>{props.t("Brands")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/registrations" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconRegistrations /></div>
                    <div className={c.descr}>{props.t("Registrations")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/campaigns" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconCampaigns /></div>
                    <div className={c.descr}>{props.t("Campaigns")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/affiliates" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconLeads /></div>
                    <div className={c.descr}>{props.t("Affiliates")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/marketing_tools" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconMarketingTools /></div>
                    <div className={c.descr}>{props.t("Marketing Tools")}</div>
                  </NavLink>
                </li>
                <li className={c.mobMenuItem}>
                  <NavLink to="/conversions" className={c.mobMenuItemLink} activeClassName={c.active}>
                    <div className={c.icon}><IconConversions /></div>
                    <div className={c.descr}>{props.t("Conversions")}</div>
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

export default withTranslation()(withRouter(SidebarContent));
