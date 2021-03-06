import BootstrapTable from "react-bootstrap-table-next";
import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import {
  registrationModel,
  RegistrationStatus,
  RegistrationStatusObj,
} from "../../../../common/utils/model";
import Page from "../../../../constants/pages";
import ChangeStatus from "../../../../components/UI/modal/changeStatus";
import { RegistrationStatusEnum } from "../../../../enums/RegistrationStatusEnum";
import { TableButtonHandlerEnum } from "../../../../enums/TableButtonHandlerEnum";

export default ({ registrations = [], setRegId, toggle, selected }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState<number>();
  const [selectStatus, setSelectStatus] = useState<RegistrationStatusEnum>(
    RegistrationStatusEnum.Registered
  );

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  let selectRow: any;

  if (selected) {
    selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: (e: any, row: any, rowIndex: any, isSelect: any) => {
        setRegId(e.id);
      },
    };
  }

  const listActions: any = [
    {
      label: "change status",
      type: TableButtonHandlerEnum.EditStatus,
      handler: (id: number, status: RegistrationStatusEnum) => {
        setIsOpen(true);
        setSelectId(+id);
        setSelectStatus(status);
      },
    },
  ];

  const columns = [
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
      dataField: "country",
      text: "Country",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent: any, data: any) => (
        <>
          <div className={"badge badge-soft-" + data.color + " font-size-12"}>
            {data.status}
          </div>
        </>
      ),
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

  if (!selected) {
    columns.unshift({
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions
          id={row.id}
          items={listActions}
          data={{ status: +row.statusId }}
        />
      ),
    });
  }

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  let tableRowEvents;
  if (!selected) {
    tableRowEvents = {
      onClick: (e: any, row: any, rowIndex: any) => {
        if (e.target.classList.length == 0) {
          setRegId(row.id);
          toggle();
        }
      },
    };
  }

  const registrationData = registrations.map((registration: any) => {
    let color;
    switch (registration.status) {
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

    return {
      id: registration.registrationId,
      affiliateId: registration.routeInfo.affiliateId,
      affiliate: registration.routeInfo.affiliateName,
      campaign: registration.routeInfo.campaignId,
      brandId: registration.routeInfo.brandId,
      brand: registration.routeInfo.brandName,
      integrationId: registration.routeInfo.integrationIdId,
      integration: registration.routeInfo.integrationName,
      status: RegistrationStatus[registration.status],
      statusId: registration.status,
      email: registration.generalInfo.email,
      country: registration.generalInfo.countryId,
      createdAt: new Date(
        registration.generalInfo.createdAt
      ).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "numeric",
      }),
      depositedAt: registration.generalInfo.depositDate
        ? new Date(registration.generalInfo.depositDate).toLocaleDateString(
            "ru-RU",
            {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "numeric",
            }
          )
        : null,
      color: color,
    };
  });

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={registrationData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap table-hover"}
        headerWrapperClasses={"thead-light"}
        rowEvents={tableRowEvents}
        selectRow={selectRow}
      />

      {selectId && (
        <ChangeStatus
          isOpen={isOpen}
          toggle={toggleAction}
          id={selectId}
          status={selectStatus}
        />
      )}
    </>
  );
};
