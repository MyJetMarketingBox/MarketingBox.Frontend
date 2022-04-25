import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import c from './TopOffers.module.scss';

const TopOffers = () => {
  const data = [
    {
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    }

  ];

  const columns = [
    {
      dataField: "name",
      text: "Name"
    },
    {
      dataField: "country",
      text: "Country"
    },
    {
      dataField: "cpa",
      text: "CPA"
    },
    {
      dataField: "epl",
      text: "EPL"
    },
    {
      dataField: "cr",
      text: "CR"
    }
  ];

  return (
    <div className={c.wrapper}>
      {/*<BootstrapTable*/}
      {/*  keyField="ai"*/}
      {/*  data={data}*/}
      {/*  columns={columns}*/}
      {/*  bordered={false}*/}
      {/*  striped={false}*/}
      {/*  classes={"table align-middle"}*/}
      {/*  headerWrapperClasses={"thead-light"}*/}
      {/*/>*/}
      Table
    </div>
  );
};

export default TopOffers;
