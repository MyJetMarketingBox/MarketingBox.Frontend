import React, { useMemo, useState } from "react";
import { ICampaignRowItem } from "src/store/campaignsRow/actionTypes";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import PopoverActivityHours from "../../../../../components/UI/popover/bottom/activityHours";
import ColumnActions from "../../../../../components/UI/columnActions/ColumnActions";
import { Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import { deleteCampaignRow, openEditCampaignRowModal } from "src/store/actions";
import ConfirmDelete from "src/components/UI/confirmDelete/ConfirmDelete";
import { RootStoreType } from "src/store/storeTypes";

interface Props {
  items: ICampaignRowItem[];
}

const CamaignRowsTable = ({ items }: Props) => {
  const dispatch = useDispatch();

  const { brands } = useSelector((store: RootStoreType) => ({
    brands: store.Brands.brands.items,
  }));
  const { SearchBar } = Search;

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  const handleDeleteCampaignRow = (id: number) => {
    dispatch(deleteCampaignRow(id));
  };

  const listActions: any = [
    {
      label: "Edit",
      handler: (id: any) => {
        dispatch(openEditCampaignRowModal(id));
      },
    },
    {
      label: "Delete",
      handler: (id: any) => {
        setIsOpen(true);
        setSelectId(id);
      },
    },
  ];

  const tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: any) => {
      if (e.target.classList.length == 0) {
        dispatch(openEditCampaignRowModal(row.id));
      }
    },
  };

  const resCampaigns = useMemo(() => {
    return items.map(campaignRow => ({
      id: campaignRow.campaignRowId,
      campaignRowId: campaignRow.campaignRowId,
      brandName: brands.find(item => item.id === campaignRow.brandId)?.name,
      geo: campaignRow.geo.name,
      priority: campaignRow.priority,
      weight: campaignRow.weight,
      capType: campaignRow.capType,
      dailyCapValue: campaignRow.dailyCapValue,
      activityHours: campaignRow.activityHours,
      information: campaignRow.information,
    }));
  }, [items, brands]);

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
      dataField: "campaignRowId",
      text: "Campaign Row ID",
      sort: true,
    },
    {
      dataField: "brandName",
      text: "Brand",
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

    {
      dataField: "information",
      text: "Information",
      sort: false,
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <>
      <ToolkitProvider
        keyField="id"
        data={resCampaigns}
        columns={columns}
        search
      >
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
                  classes={"table align-middle table-nowrap table-hover"}
                  headerWrapperClasses={"thead-light"}
                  rowEvents={tableRowEvents}
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

      <ConfirmDelete
        isOpen={isOpen}
        toggle={toggleAction}
        handleDelete={handleDeleteCampaignRow}
        id={selectId}
      />
    </>
  );
};

export default CamaignRowsTable;
