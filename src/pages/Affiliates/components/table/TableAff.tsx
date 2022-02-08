import BootstrapTable from "react-bootstrap-table-next";
import ColumnActions from "../../view/ColumnActions";

export default ({ affiliates = [] }: any) => {
  console.log(affiliates);

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions
          id={row.id}
        />
      )
    },
    {
      dataField: "username",
      text: "Username",
      sort: true
    },
    {
      dataField: "role",
      text: "Role",
      sort: true
    },
    {
      dataField: "ai",
      text: "AI",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
    },
    {
      dataField: "reportto",
      text: "Report To",
      sort: true
    },
    {
      dataField: "createdat",
      text: "Created At",
      sort: true
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent: any, productData: any) => (
        <>
          <div
            className={"badge badge-soft-" + productData.color + " font-size-12"}
          >
            {productData.status}
          </div>
        </>
      )
    }
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  return (
    <BootstrapTable
      keyField='affiliateId'
      data={affiliates}
      columns={columns}
      bordered={false}
      striped={false}
      defaultSorted={defaultSorted}
      classes={"table align-middle table-nowrap"}
      headerWrapperClasses={"thead-light"}
    />
  );
}
