import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import { eventType, httpQueryType, responseStatus } from "../../../../common/utils/model";

export default ({ logs = [], setID, toggle }: any) => {
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: false,
    },
    {
      dataField: "affiliate",
      text: "Affiliate",
      sort: true,
    },
    {
      dataField: "registrationUId",
      text: "Unique ID",
      sort: false,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: (cell: any, row: any) => {
        return new Date(row.createdAt).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "numeric",
        })
      }
    },
    {
      dataField: "eventType",
      text: "Event",
      sort: false,
    },
    {
      dataField: "httpQueryType",
      text: "Method",
      sort: false,
    },
    {
      dataField: "responseStatus",
      text: "Status",
      sort: false,
    },
    {
      dataField: "postbackReference",
      text: "URL",
      sort: false,
      headerStyle: () => {
        return { maxWidth: "10%" };
      },
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: any) => {
      if (e.target.classList.length == 0) {
        setID(row.id);
        toggle();
      }
    },
  };

  const logsData = logs.map((item: any) => {
    return {
      id: item.id,
      affiliate: item.affiliateName,
      registrationUId: item.registrationUId,
      eventType: eventType[item.eventType],
      httpQueryType: httpQueryType[item.httpQueryType].toUpperCase(),
      responseStatus: responseStatus[item.responseStatus].toUpperCase(),
      postbackReference: item.postbackReference,
      createdAt: new Date(item.date).valueOf(),
    };
  });

  return (
    <>
      <div className="table-responsive">
        <BootstrapTable
          keyField="id"
          data={logsData}
          columns={columns}
          bordered={false}
          striped={false}
          defaultSorted={defaultSorted}
          classes={"table align-middle table-nowrap table-hover"}
          headerWrapperClasses={"thead-light"}
          rowEvents={tableRowEvents}
        />
      </div>
    </>
  );
};
