import BootstrapTable from "react-bootstrap-table-next";
import React, { useState } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import ColumnActions from "../columnActions/ColumnActions";
import { registrationModel, RegistrationStatus } from "../../../../common/utils/model";

export default ({registrations = [], setRegId, toggle} : any) => {

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort:false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.id} />
      )
    },
    {
      dataField: "affiliate",
      text: "Affiliate",
      sort: true,
    },
    {
      dataField: "campaign",
      text: "Campaign",
      sort: true,
    },
    {
      dataField: "brand",
      text: "Brand",
      sort: true,
    },
    {
      dataField: "integration",
      text: "Integration",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
    },
    {
      dataField: "depositedAt",
      text: "Deposited At",
      sort: true,
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const tableRowEvents = {
    onClick: (e:any, row:any, rowIndex:any) => {
      //console.log(e);
      if(e.target.classList.length == 0) {
        setRegId(row.id);
        toggle();
      }
    }
  }

  const registrationData = registrations.map((registration : any) => {
    return {
      id: registration.registrationId,
      affiliate: registration.routeInfo.affiliateId,
      campaign: registration.routeInfo.campaignId,
      brand: registration.routeInfo.brandId,
      integration: registration.routeInfo.integrationIdId,
      status: RegistrationStatus[registration.status],
      email: registration.generalInfo.email,
      country: registration.generalInfo.country,
      createdAt: new Date(registration.generalInfo.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit", second: "numeric"}),
      depositedAt: (registration.generalInfo.depositedAt) ? new Date(registration.generalInfo.depositedAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit", second: "numeric"}) : null,
    }
  });

  return (
    <>
      <BootstrapTable
        keyField='id'
        data={registrationData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap"}
        headerWrapperClasses={"thead-light"}
        rowEvents={tableRowEvents}
      />
    </>
  )
}