import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default ({reports = []} : any) => {

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    /*{
      dataField: "id",
      text: "ID",
      sort: false,
    },*/
    {
      dataField: "failedCount",
      text: "Failed Count",
      sort: false,
    },
    {
      dataField: "declinedCount",
      text: "Declined Count",
      sort: false,
    },
    {
      dataField: "clicks",
      text: "Clicks",
      sort: false,
    },
    {
      dataField: "registrationCount",
      text: "Registration Count",
      sort: false,
    },
    {
      dataField: "ftdCount",
      text: "ftd Count",
      sort: false,
    },
    {
      dataField: "cr",
      text: "cr",
      sort: true,
    },
    {
      dataField: "payout",
      text: "payout",
      sort: true,
    },
    {
      dataField: "revenue",
      text: "revenue",
      sort: true,
    },
    {
      dataField: "pl",
      text: "pl (p&l)",
      sort: true,
    },
    {
      dataField: "roi",
      text: "roi",
      sort: false,
    },
    {
      dataField: "epc",
      text: "EPC",
      sort: false,
    },
    {
      dataField: "epl",
      text: "epl",
      sort: false,
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const reportData = reports.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      clicks: item.clicks,
      cr: item.cr,
      declinedCount: item.declinedCount,
      epc: item.epc,
      epl: item.epl,
      failedCount: item.failedCount,
      ftdCount: item.ftdCount,
      payout: item.payout,
      pl: item.pl,
      registrationCount: item.registrationCount,
      revenue: item.revenue,
      roi: item.roi
    }
  })

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={reportData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap table-hover un-pointer-tr"}
        headerWrapperClasses={"thead-light"}
      />
    </>
  )
}