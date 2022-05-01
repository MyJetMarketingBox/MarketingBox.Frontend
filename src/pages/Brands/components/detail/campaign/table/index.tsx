import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default (props : any ) => {

  console.log(props);

  /*[
    {
      "campaignRowId": 20,
      "brandId": 20,
      "campaignId": 5,
      "priority": 10,
      "weight": 10,
      "capType": 0,
      "dailyCapValue": 20,
      "activityHours": [
        {
          "day": 0,
          "isActive": true,
          "from": "1200.00:00:00",
          "to": "1200.00:00:00"
        }
      ],
      "information": "Hello",
      "enableTraffic": false,
      "geo": {
        "id": 10,
        "createdAt": "2022-03-30T18:50:50.326458",
        "name": "Test!#$%&'*+-/=?^_`{|}~623875634",
        "countryIds": [
          1,
          50,
          100,
          150,
          249
        ]
      }
    }
  ]*/

  const { campaigns } = props

  const resCampaigns = campaigns.map((campaign : any) => {
    return {

    }
  })

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px", "word-break": "break-word" },
    }
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  return (
    <React.Fragment>

      <BootstrapTable
        keyField='id'
        data={resCampaigns}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle"}
        headerWrapperClasses={"thead-light"}
      />

    </React.Fragment>
  )
}