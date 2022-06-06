import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router";
import Page from "../../../../constants/pages";

const tableIndex = ({data = []} : any) => {

  const history = useHistory();

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "fileName",
      text: "File Name",
    },
    {
      dataField: "createdByUserName",
      text: "Created User",
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
    },
  ]

  const resList = data.map((item: any) => {

    return {
      id: item.id,
      fileName: item.fileName,
      createdAt:  new Date(item.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit"}),
      createdByUserName: item.createdByUserName
    }
  })

  const tableRowEvents = {
    onClick: (e:any, row:any, rowIndex:any) => {
      if(e.target.classList.length == 0) {
        history.push(`${Page.REDISTRIBUTION}/files/${row.id}`);
        //history.push(`${Page.AFFILIATES}/${id}`);
      }
    }
  }

  return (
    <>
      <BootstrapTable
        keyField='id'
        data={resList}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap table-hover"}
        headerWrapperClasses={"thead-light"}
        rowEvents={tableRowEvents}
      />
    </>
  )

}

export default tableIndex;