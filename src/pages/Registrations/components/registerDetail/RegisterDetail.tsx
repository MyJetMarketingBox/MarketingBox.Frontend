import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane, Tooltip
} from "reactstrap";

import classnames from "classnames";
import { RegistrationStatus } from "../../../../common/utils/model";
import RegTab1 from "./RegTab1";
import RegTab2 from "./RegTab2";

export default ({ regId }: any) => {
  const [activeTab, setActiveTab] = useState("1");
  const [tAffTop, settAffTop] = useState(false);
  const [tBrTop, settBrTop] = useState(false);
  const [tCampTop, settCampTop] = useState(false);
  const [tIntegrTop, settIntegrTop] = useState(false);

  const { register, сountries } = useSelector((state: any) => {
    return {
      register: state.Registrations.registrations.items.find((item: any) => {
        return item.registrationId == regId;
      }),
      сountries: state.Countries.value.items
    };
  });

  const { generalInfo, additionalInfo, status, routeInfo, registrationId } = register;

  const country = useMemo(() => {
    return сountries.find((item:any) => {
      return item.id === generalInfo.countryId
    })
  }, [сountries]);

  let color;
  switch (status) {
    case 0:
      color = "danger";
      break;
    case 1:
      color = "dark-blue";
      break;
    case 2:
      color = "fx-orange";
      break;
    case 3:
      color = "success";
      break;
    case 4:
      color = "dark";
      break;
    default:
      color = "light";
      break;
  }

  return (
    <Row>
      <Col xl={4} lg={5}>
        <Card>
          <CardBody>
            <CardTitle className="mb-3">Contact Information</CardTitle>

            <dl className="row mb-0">
              <dt className="col-sm-5">ID: </dt>
              <dd className="col-sm-7">{registrationId}</dd>

              <dt className="col-sm-5">IP: </dt>
              <dd className="col-sm-7">{generalInfo.ip}</dd>

              <dt className="col-sm-5">Country: </dt>
              <dd className="col-sm-7">{ country?.name } | {country?.alfa2Code}</dd>

              <dt className="col-sm-5">Phone: </dt>
              <dd className="col-sm-7">{generalInfo.phone}</dd>

              <dt className="col-sm-5">Email: </dt>
              <dd className="col-sm-7">{generalInfo.email}</dd>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle className="mb-3">Route Info</CardTitle>
            <dl className="row mb-0">
              <dt className="col-sm-5">Affiliate: </dt>
              <dd className="col-sm-7">
                <Tooltip
                  placement="top"
                  isOpen={tAffTop}
                  target={`TooltipTop-${routeInfo.affiliateId }`}
                  toggle={() => {
                    settAffTop(!tAffTop);
                  }}
                >
                  AI: {routeInfo.affiliateId}
                </Tooltip>
                {routeInfo.affiliateName}
                &nbsp;
                <i className="bx bx-info-circle" id={`TooltipTop-${routeInfo.affiliateId }`}></i>
              </dd>

              <dt className="col-sm-5">Brand: </dt>
              <dd className="col-sm-7">
                <Tooltip
                  placement="top"
                  isOpen={tBrTop}
                  target={`TooltipTop-${routeInfo.brandId }`}
                  toggle={() => {
                    settBrTop(!tBrTop);
                  }}
                >
                  BI: {routeInfo.brandId}
                </Tooltip>
                {routeInfo.brandName}
                &nbsp;
                <i className="bx bx-info-circle" id={`TooltipTop-${routeInfo.brandId }`}></i>
              </dd>

              <dt className="col-sm-5">Campaign: </dt>
              <dd className="col-sm-7">
                <Tooltip
                  placement="top"
                  isOpen={tCampTop}
                  target={`TooltipTop-${routeInfo.campaignId }`}
                  toggle={() => {
                    settCampTop(!tCampTop);
                  }}
                >
                  CI: {routeInfo.campaignId}
                </Tooltip>
                {routeInfo.campaignName}
                &nbsp;
                <i className="bx bx-info-circle" id={`TooltipTop-${routeInfo.campaignId }`}></i>
              </dd>

              <dt className="col-sm-5">Integration:</dt>
              <dd className="col-sm-7">
                <Tooltip
                  placement="top"
                  isOpen={tIntegrTop}
                  target={`TooltipTop-${routeInfo.integrationId }`}
                  toggle={() => {
                    settIntegrTop(!tIntegrTop);
                  }}
                >
                  ID: {routeInfo.integrationId}
                </Tooltip>
                {routeInfo.integrationName}
                &nbsp;
                <i className="bx bx-info-circle" id={`TooltipTop-${routeInfo.integrationId }`}></i>
              </dd>
            </dl>
          </CardBody>
        </Card>
      </Col>
      <Col xl={8} lg={7}>
        <Card>
          <CardBody>
            <Row>
              <div className="col-sm order-2 order-sm-1">
                <div className="d-flex align-items-start mt-3 mt-sm-0">
                  <div className="flex-shrink-0">
                    <div className="avatar-xl me-3">
                      <span
                        className={
                          "avatar-title bg-soft-light text-light display-4 m-0 rounded-circle"
                        }
                      >
                        <i
                          className="bx bxs-user-circle"
                          style={{ color: "#cb7042" }}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div>
                      <h5 className="font-size-16 mb-1">
                        {generalInfo.firstName} {generalInfo.lastName}
                      </h5>
                      <div className="text-muted font-size-13">
                        <b>Reg Time:</b>{" "}
                        {new Date(generalInfo.createdAt).toLocaleDateString(
                          "ru-RU",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "numeric",
                          }
                        )}
                      </div>
                      {generalInfo.depositDate ? (
                        <div className="text-muted font-size-13">
                          <b>Dep Date:</b> &nbsp;
                          {new Date(
                            generalInfo.depositDate
                          ).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "numeric",
                          })}
                        </div>
                      ) : null}
                      {generalInfo.conversionDate ? (
                        <div className="text-muted font-size-13">
                          <b>Conversion Date:</b> &nbsp;
                          {new Date(
                            generalInfo.conversionDate
                          ).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "numeric",
                          })}
                        </div>
                      ) : null}

                      <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                        <div>
                          <b>Status:</b>
                          <Badge
                            className={`badge badge-soft-${color} ms-1 font-size-13`}
                          >
                            {RegistrationStatus[status]}
                          </Badge>
                        </div>
                        <div>
                          <b>Email:</b> {generalInfo.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>

            <Nav className="nav-tabs-custom card-header-tabs border-top mt-4">
              <NavItem>
                <NavLink
                  to="#"
                  className={classnames(
                    {
                      active: activeTab === "1",
                    },
                    "px-3"
                  )}
                  onClick={() => {
                    setActiveTab("1");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  General Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  className={classnames(
                    {
                      active: activeTab === "2",
                    },
                    "px-3"
                  )}
                  onClick={() => {
                    setActiveTab("2");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Log Status
                </NavLink>
              </NavItem>
            </Nav>
          </CardBody>
        </Card>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <RegTab1 additionalInfo={additionalInfo} />
          </TabPane>
          <TabPane tabId="2">
            <RegTab2 regId={regId} />
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
};
