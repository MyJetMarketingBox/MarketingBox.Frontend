import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Col, Row
} from "reactstrap";

import ColumnActions from "../../../../../../components/UI/columnActions/ColumnActions";
import PopoverActivityHours from "../../../../../../components/UI/popover/bottom/activityHours"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

export default ({campaigns} : any ) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false)

  const { SearchBar } = Search;

  //console.log(campaigns);

  const resCampaigns = campaigns.map((item : any) => {
    console.log(item);
    return {
      campaignName: item.campaign.name,
      campaignId: item.campaign.id,
      geo: item.geo.name,
      priority: item.priority,
      weight: item.weight,
      capType: item.capType,
      dailyCapValue: item.dailyCapValue,
      campaignRowId: item.campaignRowId,
      activityHours: item.activityHours,
    }
  })

  const listActions: any = [
    /*{
      label: "edit",
      handler: (id: any) => {
        history.push(`/some/${id}`);
      },
    },*/
    {
      label: "delete",
      handler: (id: any) => {
        setIsOpen(true);
        setSelectId(id);
      },
    }
  ];

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions
          id={row.campaignRowId}
          items={listActions}
        />
      )
    },
    {
      dataField: "campaignName",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px", "word-break": "break-word" },
    },
    {
      dataField: "campaignId",
      text: "Campaign ID",
      sort: true,
    },
    {
      dataField: "geo",
      text: "GEO",
      sort: true,
    },
    {
      dataField: "activityHours",
      text: "Activity Hours",
      sort: false,
      formatter: (cell: any, row: any) => (
        <PopoverActivityHours
          id={row.campaignRowId}
          activityHours={row.activityHours}
        />
      )
    },
    {
      dataField: "priority",
      text: "Priority",
      sort: true,
    },
    {
      dataField: "weight",
      text: "Weight",
      sort: true,
    },
    {
      dataField: "capType",
      text: "Cap Type",
      sort: true,
    },
    {
      dataField: "dailyCapValue",
      text: "Daily Cap",
      sort: true,
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  return (
    <ToolkitProvider
      keyField="id"
      data={resCampaigns}
      columns={columns}
      search
    >
      {(toolkitProps) => (
        <React.Fragment>

          <Col sm="4" xs="12">
            <div className="search-box d-inline-block">
              <div className="position-relative">
                <SearchBar {...toolkitProps.searchProps} />
                <i className="bx bx-search-alt search-icon-search" />
              </div>
            </div>
          </Col>

          <div className="table-responsive">
            {campaigns.length > 0 ?
              <BootstrapTable
                {...toolkitProps.baseProps}
                keyField='id'
                bordered={false}
                striped={false}
                defaultSorted={defaultSorted}
                classes={"table align-middle"}
                headerWrapperClasses={"thead-light"}
              />
              : <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                <h3>No Data Available</h3>
              </div>
            }
          </div>
        </React.Fragment>
      )}
    </ToolkitProvider>
  )
}