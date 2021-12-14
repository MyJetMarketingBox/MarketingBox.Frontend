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
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

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

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
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


  const getAuthUser = localStorage.getItem("authUser");
  let user = null;
  if (getAuthUser) {
    user = JSON.parse(getAuthUser);
  }

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

            {(user.role != "affiliatesManager" && user.role != "affiliates") ?
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
                <Icon name="box" />
                <span>{props.t("Registrations")}</span>
              </Link>
            </li>

            {user.role != "affiliates" ? (<li>
              <Link to="/Affiliates" className="">
                <Icon name="briefcase"/>
                <span>{props.t("Affiliates")}</span>
              </Link>
            </li>):(<li></li>)}

            <li>
              <Link to="/marketing_tools" className="">
                <Icon name="cpu" />
                <span>{props.t("Marketing Tools")}</span>
              </Link>
            </li>

            {user.role != "affiliates" ? (<li>
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
                {(user.role != "affiliatesManager" && user.role != "affiliates") ?
                (<li>
                  <Link to="/re_registering">{props.t("Registering")}</Link>
                </li>) : (<li></li>)
                }
              </ul>
            </li>

            {/* <li>
              <Link to="/#" className="has-arrow">
                <Icon name="grid" />
                <span>{props.t("Apps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Calendar")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Chat")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>{props.t("Email")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Inbox")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Read Email")} </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>{props.t("Invoices")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Invoice List")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Invoice Detail")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <span>{props.t("Contacts")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("User Grid")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("User List")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Profile")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow">
                <Icon name="users" />
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Recover Password")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Confirm Mail")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Email Verification")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Two Step Verification")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="file-text" />
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li className="menu-title">{props.t("Elements")}</li> */}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="briefcase" />
                <span>{props.t("Components")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Drawer")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Tabs & Accordions")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Colors")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="gift" />
                <span>{props.t("Extended")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Sweet Alert")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Session Timeout")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Notifications")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="">
                <Icon name="box" />
                <span className="badge rounded-pill bg-soft-danger text-danger float-end">
                  7
                </span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Validation")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Advanced Plugins")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Editors")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("File Upload")} </Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="sliders" />
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Bootstrap Basic")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("DataTables")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Responsive")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Editable")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="pie-chart" />
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Apexcharts")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Echarts")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Sparkline")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="cpu" />
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Material Design")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="map" />
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Google")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Vector")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Leaflet")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <Icon name="share-2" />
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
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
