import React, { useMemo } from "react";
import { ICampaignRowItem } from "src/store/campaignsRow/actionTypes";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import PopoverActivityHours from "../../../../../components/UI/popover/bottom/activityHours";
import ColumnActions from "../../../../../components/UI/columnActions/ColumnActions";
import { Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch } from "react-redux";
import { deleteCampaignRow } from "src/store/actions";

interface Props {
  items: ICampaignRowItem[];
}

const CamaignRowsTable = ({ items }: Props) => {
  const dispatch = useDispatch();
  const { SearchBar } = Search;

  const listActions: any = [
    /*{
      label: "edit",
      handler: (id: any) => {
        history.push(`/some/${id}`);
      },
    },*/
    {
      label: "Delete",
      handler: (id: any) => {
        console.log("delete ", id);
        dispatch(deleteCampaignRow(id));
        // setIsOpen(true);
        // setSelectId(id);
      },
    },
  ];

  const resCampaigns = useMemo(() => {
    return items.map(campaignRow => ({
      id: campaignRow.campaignRowId,
      campaignName: campaignRow.campaign.name,
      campaignId: campaignRow.campaign.id,
      geo: campaignRow.geo.name,
      priority: campaignRow.priority,
      weight: campaignRow.weight,
      capType: campaignRow.capType,
      dailyCapValue: campaignRow.dailyCapValue,
      campaignRowId: campaignRow.campaignRowId,
      activityHours: campaignRow.activityHours,
    }));
  }, [items]);

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.campaignRowId} items={listActions} />
      ),
    },
    {
      dataField: "campaignName",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px" },
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
      ),
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
      order: "desc",
    },
  ];

  return (
    <ToolkitProvider keyField="id" data={resCampaigns} columns={columns} search>
      {toolkitProps => (
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
            {items.length > 0 ? (
              <BootstrapTable
                {...toolkitProps.baseProps}
                keyField="id"
                bordered={false}
                striped={false}
                defaultSorted={defaultSorted}
                classes={"table align-middle"}
                headerWrapperClasses={"thead-light"}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <h3>No Data Available</h3>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </ToolkitProvider>
  );
};

export default CamaignRowsTable;
