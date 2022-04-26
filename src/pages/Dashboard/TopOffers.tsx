import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import c from "./TopOffers.module.scss";
import SimpleBar from "simplebar-react";

const TopOffers = () => {
  const data = [
    {
      id: 1,
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      id: 2,
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      id: 3,
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      id: 4,
      name: "top_offer_name",
      country: "PL",
      cpa: "CPA q-ty",
      epl: "EPL q-ty",
      cr: "CR q-ty"
    },
    {
      id: 5,
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
      <SimpleBar>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          bordered={false}
          striped={false}
          classes={"table align-middle table-nowrap"}
          headerWrapperClasses={"thead-light"}
        />
      </SimpleBar>
    </div>
  );
};

export default TopOffers;
