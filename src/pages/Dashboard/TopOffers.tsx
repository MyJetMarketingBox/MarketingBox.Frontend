import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import c from "./TopOffers.module.scss";
import SimpleBar from "simplebar-react";

const TopOffers = () => {
  const data = [
    {
      id: 1,
      name: "Tesler",
      country: "AU",
      cpa: "1000",
      epl: "EPL q-ty",
      cr: "10-15%"
    },
    {
      id: 2,
      name: "Quantum AI",
      country: "CA",
      cpa: "950",
      epl: "EPL q-ty",
      cr: "10-15%"
    },
    {
      id: 3,
      name: "Bitcoin Profit",
      country: "SG",
      cpa: "950",
      epl: "EPL q-ty",
      cr: "10%"
    },
    {
      id: 4,
      name: "Bitcoin Loophole",
      country: "DE",
      cpa: "950",
      epl: "EPL q-ty",
      cr: "10-12%"
    },
    {
      id: 5,
      name: "Tesler",
      country: "AT",
      cpa: "1050",
      epl: "EPL q-ty",
      cr: "10-12%"
    },
    {
      id: 6,
      name: "Crypto Bank",
      country: "PL",
      cpa: "700",
      epl: "EPL q-ty",
      cr: "8%"
    },
    {
      id: 7,
      name: "AI Stock Profits",
      country: "IT",
      cpa: "850",
      epl: "EPL q-ty",
      cr: "10-12%"
    },
    {
      id: 8,
      name: "CFD Trader",
      country: "ES",
      cpa: "750",
      epl: "EPL q-ty",
      cr: "8-9%"
    }
  ];

  const columns = [
    {
      dataField: "name",
      text: "Offer Name"
    },
    {
      dataField: "country",
      text: "GEO"
    },
    {
      dataField: "cpa",
      text: "CPA, $"
    },
    /*{
      dataField: "epl",
      text: "EPL"
    },*/
    {
      dataField: "cr",
      text: "Average CR, %"
    }
  ];

  return (
    <div className={c.wrapper}>
      <h3>Top offers</h3>
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
