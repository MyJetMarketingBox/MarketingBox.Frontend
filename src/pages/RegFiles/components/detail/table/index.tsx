import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default ({data = []} : any) => {

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const columns = [
    {
      dataField: "index",
      text: "ID",
      sort: true,
    },
    {
      dataField: "fileId",
      text: "List",
      sort: true,
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "ip",
      text: "IP",
      sort: true,
    },
    {
      dataField: "countryAlfa2Code",
      text: "Country Code",
      sort: true,
    },
    {
      dataField: "funnel",
      text: "Funnel",
      sort: true,
    },
    {
      dataField: "affCode",
      text: "Aff Code",
      sort: true,
    },
    {
      dataField: "sub1",
      text: "Sub 1",
      sort: true,
    },
    {
      dataField: "sub2",
      text: "Sub 2",
      sort: true,
    },
    {
      dataField: "sub3",
      text: "Sub 3",
      sort: true,
    },
    {
      dataField: "sub4",
      text: "Sub 4",
      sort: true,
    },
    {
      dataField: "sub5",
      text: "Sub 5",
      sort: true,
    },
    {
      dataField: "sub6",
      text: "Sub 6",
      sort: true,
    },
    {
      dataField: "sub7",
      text: "Sub 7",
      sort: true,
    },
    {
      dataField: "sub8",
      text: "Sub 8",
      sort: true,
    },
    {
      dataField: "sub9",
      text: "Sub 9",
      sort: true,
    },
    {
      dataField: "sub10",
      text: "Sub 10",
      sort: true,
    },
  ];


  const resList = data.map((item: any) => {
    return {
      index: item.index,
      fileId: item.fileId,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      password: item.password,
      ip: item.ip,
      countryAlfa2Code: item.countryAlfa2Code,
      funnel: item.funnel,
      affCode: item.affCode,
      sub1: item.sub1,
      sub2: item.sub2,
      sub3: item.sub3,
      sub4: item.sub4,
      sub5: item.sub5,
      sub6: item.sub6,
      sub7: item.sub7,
      sub8: item.sub8,
      sub9: item.sub9,
      sub10: item.sub10,
    }
  })

  return (
    <>
      <BootstrapTable
        keyField='index'
        data={resList}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap table-hover"}
        headerWrapperClasses={"thead-light"}
      />
    </>
  )
}