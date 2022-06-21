import BootstrapTable from "react-bootstrap-table-next";


export default ({postback = []} : any) => {

  const postbackData = [{}]

  const columns = [
    {
      dataField: "ID",
      text: "AI",
      sort: true
    }
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  return (
    <div>
      <BootstrapTable
        keyField='ai'
        data={postbackData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap"}
        headerWrapperClasses={"thead-light"}
      />
    </div>
  );

}