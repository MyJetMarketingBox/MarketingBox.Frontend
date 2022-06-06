import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAffiliate, getAffiliates } from "../../../../store/affiliates/actions";
import { clearRedistribution, getRedistribution } from "../../../../store/redistribution/actions";
import { Col, Collapse, FormGroup, InputGroup, Label, Row } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import Select from "../../../../components/UI/select";
import { clearCampaigns, getCampaigns } from "../../../../store/campaigns/actions";
import SearchRedistribution from "../search";
/*import Flatpickr from "react-flatpickr";
import { getUpdateDate } from "../../../../helpers/getUpdateDate";*/

const filterIndex = () => {
  const dispatch = useDispatch()

  const [collapse, setCollapse] = useState(false);
  const [countFilter, setCountFilter] = useState<any>();
  const [selectAff, setSelectAff] = useState<any>([]);
  const [selectCampaign, setSelectCampaign] = useState<any>([]);
  const [getName, setName] = useState("");
  const [dateFilter, setDateFilter] = useState<any>([]);
  const filter = {
    order: 1,
    limit: 50,
  };

  const { affiliates, loadingAffList, loadingRedistribution, campaigns, loadingCampaigns } = useSelector((state: any) => {
    return {
      loadingRedistribution: state.Redistribution.loading,
      affiliates: state.Affiliates.affiliates.items,
      loadingAffList: state.Affiliates.loading,
      campaigns: state.Campaigns.campaigns.items,
      loadingCampaigns: state.Campaigns.loading,
    }
  })

  useEffect(() => {
    dispatch(getAffiliates("", {order: 1}))
    dispatch(getCampaigns("", { order: 1 }));
    return () => {
      dispatch(clearAffiliate());
      dispatch(clearCampaigns());
    }
  }, [])

  useEffect(() => {
    let count = 0;

    selectCampaign.value > 0 ? (count += 1) : null;
    selectAff.value > 0 ? (count += 1) : null;
    getName.length > 0 ? (count += 1) : null;

    setCountFilter(count)
  })

  const affiliateList = affiliates.map((item: any) => {
    return {
      value: item.id,
      label: item.generalInfo.username,
    };
  });

  const campaignList = campaigns.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const changeName = (e: any) => {
    setName(e.target.value)
  }

  const handleFilterSubmit = (values: any) => {

    const curFilter = {
      ...filter,
      AffiliateId: selectAff?.value,
      CampaignId: selectCampaign?.value,
      Name: values["name"] || null,
      //CreatedBy: dateFilter || null,
    }

    dispatch(clearRedistribution());
    dispatch(getRedistribution(null, curFilter));
  }

  const handleClearFilter = () => {
    setSelectAff([]);
    setSelectCampaign([]);
    setName("");
    //setDateFilter([]);

    dispatch(clearRedistribution());
    dispatch(getRedistribution(null, filter));
  }

  /*const setDateOnFilter = (data: any) => {
    if (data.length) {
      const utcFrom = data[0].getTime();
      const from = getUpdateDate(utcFrom);
      setDateFilter(from);
    }
  };*/

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <Col className="col-md-4">
        <SearchRedistribution />
      </Col>

      <Col className="col-md-8 text-end">
        {collapse && (
          <button
            className="btn btn-light mr-10 fw-bold"
            type="button"
            onClick={handleClearFilter}
          >
            Clear
          </button>
        )}

        <button
          className="btn btnOrange mr-10"
          type="button"
          onClick={toggleCollapse}
        >
          {collapse ? (
            <>
              Hide filters
                <span className="count-white ml-10">{countFilter}</span>
            </>
          ) : (
            <>
              Open filters
              <i className="bx bx-filter me-1 font-size-20 icon" />
            </>
          )}
        </button>

        <button className="btn btn-dark-blue">

          Add new
        </button>
      </Col>

      <div className="accordion mt-3" id="accordion">
        <Collapse isOpen={collapse} className="accordion-collapse">
          <div className="accordion-body">
            <AvForm onValidSubmit={ handleFilterSubmit }>
              <Row>

                {/*<Col lg={3}>
                  <div className="mb-4 custom-react-select">
                    <div className="react-select-descr">Date Range</div>
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="dd M,yyyy"
                      options={{
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "Y-m-d",
                      }}
                      value={dateFilter}
                      onChange={setDateOnFilter}
                    />
                  </div>
                </Col>*/}

                <Col lg={4}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Affiliates</div>
                    <Select
                      isSearchable
                      isLoading={loadingAffList}
                      options={affiliateList}
                      onChange={setSelectAff}
                      value={selectAff}
                    />
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3 custom-react-select">
                    <div className="react-select-descr">Campaigns</div>
                    <Select
                      isSearchable
                      isLoading={loadingCampaigns}
                      options={campaignList}
                      onChange={setSelectCampaign}
                      value={selectCampaign}
                    />
                  </div>
                </Col>

                <Col lg={4}>
                  <FormGroup className="mb-3">
                    <Label htmlFor="name">Name</Label>
                    <AvField
                      name="name"
                      placeholder="Name"
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={changeName}
                      value={getName}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col className="col-md-12 text-end">
                  <button
                    type="submit"
                    className="btn btnOrange"
                    disabled={loadingRedistribution}
                  >
                    {loadingRedistribution && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Search
                  </button>
                </Col>
              </Row>

            </AvForm>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default filterIndex