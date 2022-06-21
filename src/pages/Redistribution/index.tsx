import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import Loader from "../../components/UI/loader";
import { useDispatch, useSelector } from "react-redux";
import { clearRedistribution, getRedistribution } from "../../store/redistribution/actions";
import Table from "./components/table/index";
import Filter from "./components/filter/index";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import { RedistributionTubsEnum } from "../../enums/RedistributionTubsEnum";
import { useHistory, useParams } from "react-router";
import Page from "../../constants/pages";
import classnames from "classnames";
import Files from "../RegFiles/index"

const TAB_DATA = {
  [RedistributionTubsEnum.Redistribution]: {
    title: "Redistribution List",
    tabTitle: "Redistribution",
  },

  [RedistributionTubsEnum.Files]: {
    title: "File List",
    tabTitle: "Files",
  },
}

const Redistribution = () => {
  const { tab } = useParams<{ id: string; tab: string }>();
  const { push } = useHistory();

  const dispatch = useDispatch();

  const { loading, loaded, dataList, nextUrl, total} = useSelector((state: any) => {
    return {
      loading: state.Redistribution.loading,
      loaded: state.Redistribution.loaded,
      dataList: state.Redistribution.data.items,
      nextUrl: state.Redistribution.data.pagination.nextUrl,
      total: state.Redistribution.data.pagination.total,
    }
  })
  const [customActiveTab, setCustomActiveTab] = useState<RedistributionTubsEnum>(tab === RedistributionTubsEnum.Files ? RedistributionTubsEnum.Files : RedistributionTubsEnum.Redistribution)


  let filter = {
    order: 1,
    limit: 50
  }

  const toggleTab = (tabId : any) => {
    switch (tabId) {
      case RedistributionTubsEnum.Files:
        push(`${Page.REDISTRIBUTION}/files`);
        break;

      default:
        push(Page.REDISTRIBUTION);
        break;
    }
    setCustomActiveTab(tabId);
  }

  useEffect(() => {
    dispatch(getRedistribution('', filter))
    return () => {
      dispatch(clearRedistribution());
    }
  }, [])

  async function loadMore() {
    if(nextUrl){
      dispatch(getRedistribution(nextUrl, {}))
    }
  }

  return (
    <React.Fragment>
      { !loaded && loading && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>Redistribution | TraffMe </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="TraffMe" breadcrumbItem="Redistribution" />

          <Row>
            <Card>
              <CardHeader className="align-items-center d-flex">
                <div className="flex-shrink-0">
                  <Nav
                    tabs
                    className="justify-content-start nav-tabs-custom rounded card-header-tabs"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === RedistributionTubsEnum.Redistribution,
                        })}
                        onClick={() => {
                          toggleTab(RedistributionTubsEnum.Redistribution);
                        }}
                      >
                        <span className="d-sm-block"> {TAB_DATA[RedistributionTubsEnum.Redistribution].tabTitle}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === RedistributionTubsEnum.Files,
                        })}
                        onClick={() => {
                          toggleTab(RedistributionTubsEnum.Files);
                        }}
                      >
                        <span className="d-sm-block"> {TAB_DATA[RedistributionTubsEnum.Files].tabTitle}
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </CardHeader>

              <CardBody>
                <TabContent
                  activeTab={customActiveTab}
                  className="text-muted"
                >
                  <TabPane tabId={RedistributionTubsEnum.Redistribution}>
                    <Row className="mb-4">

                      <Filter />

                      <div className="col-xl-12 text-muted">
                        Showing {dataList.length} / {total} results
                      </div>
                    </Row>

                    <Row className="mb-4">
                      <Col xl="12">
                        <div className="table-responsive">
                          {dataList.length ? <Table data={dataList}/> : null}
                          {
                            (!dataList.length && loaded)
                              ? <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                            <h3>No Data Available</h3>
                          </div>
                              : null
                          }
                        </div>
                      </Col>
                    </Row>

                    {nextUrl &&
                      <Row>
                        <Col xs="12">
                          <div className="text-center">
                            <BtnLoadMore
                              loading={loading}
                              handeClick={loadMore}
                            />
                          </div>
                        </Col>
                      </Row>
                    }
                  </TabPane>

                  <TabPane tabId={RedistributionTubsEnum.Files}>
                    <Files />
                  </TabPane>

                </TabContent>
              </CardBody>
            </Card>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Redistribution;