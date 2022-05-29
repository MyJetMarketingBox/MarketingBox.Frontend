import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Currency, PayoutType } from "../../../../../common/utils/model";
import ConfirmDelete from "../../../../../components/UI/confirmDelete/ConfirmDelete";
import ColumnActions from "../../../../../components/UI/columnActions/ColumnActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAffiliate } from "../../../../../store/affiliates/profile/actions";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import AddModal from "../../../../../components/UI/modal/payouts/addAffiliate";
import AssignModal from "../Modal/assign";
//import ColumnActions from "../../columnActions/ColumnActions";

const tablePayouts = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);
  const [plusBtn, setPlusBtn] = useState(false);
  const [modalAdd, setAddModal] = useState<boolean>(false);
  const [modalAssign, setAssignModal] = useState<boolean>(false);
  const { SearchBar } = Search;

  const { affProfile } = useSelector((state: any) => {
    return {
      affProfile: state.AffProfile.affProfile,
    };
  });

  const { payouts } = props;

  const resPayouts = payouts.map((payout: any) => {
    return {
      id: payout.id,
      name: payout.name,
      amount: payout.amount,
      currency: Currency[payout.currency],
      payoutType: PayoutType[payout.payoutType].label,
      geo: payout.geo.name,
      createdDate: new Date(payout.createdAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      updatedDate: new Date(payout.modifiedAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
    };
  });

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  const toggleModalAdd = () => {
    setAddModal(prev => !prev);
  };

  const toggleModalAssign = () => {
    setAssignModal(prev => !prev);
  };

  const handleDeleteAffPayout = (id: number) => {
    const { payouts, offerAffiliates, bank, company, ...affClear } = affProfile;

    const currPayouts = payouts
      .filter((item: any) => {
        return item.id != id;
      })
      .map((item: any) => {
        return item.id;
      });

    affClear.affiliatePayoutIds = currPayouts;

    dispatch(updateAffiliate(affClear, affClear.id));
  };

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
    },
  ];

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.id} items={listActions} />
      ),
    },
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "currency",
      text: "Currency",
      sort: true,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
    },
    {
      dataField: "payoutType",
      text: "Payout type",
      sort: true,
    },
    {
      dataField: "geo",
      text: "Geo",
      sort: true,
    },
    {
      dataField: "createdDate",
      text: "Created date",
      sort: true,
    },
    {
      dataField: "updatedDate",
      text: "Updated date",
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
    <React.Fragment>
      <ToolkitProvider keyField="id" data={resPayouts} columns={columns} search>
        {toolkitProps => (
          <React.Fragment>
            <Row>
              <Col className="col-md-4 col-sm-4 col-xs-12">
                <div className="search-box d-inline-block">
                  <div className="position-relative">
                    <SearchBar {...toolkitProps.searchProps} />
                    <i className="bx bx-search-alt search-icon-search" />
                  </div>
                </div>
              </Col>

              <Col className="col-md-8 col-sm-8 col-xs-12 text-end">
                <Dropdown
                  isOpen={plusBtn}
                  toggle={() => {
                    setPlusBtn(!plusBtn);
                  }}
                  className="btn-group me-2 mb-2 mb-sm-0"
                >
                  <DropdownToggle
                    className="btn btnOrange waves-light waves-effect dropdown-toggle"
                    tag="i"
                  >
                    <i className="bx bx-list-plus font-size-20"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={toggleModalAdd}>
                      New Payout
                    </DropdownItem>
                    <DropdownItem onClick={toggleModalAssign}>
                      Assign
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>

            <div className="table-responsive">
              {payouts.length > 0 ? (
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

      <AddModal isOpen={modalAdd} toggle={toggleModalAdd} isAff={true}/>
      <AssignModal isOpen={modalAssign} toggle={toggleModalAssign}/>

      <ConfirmDelete
        isOpen={isOpen}
        toggle={toggleAction}
        handleDelete={handleDeleteAffPayout}
        id={selectId}
      />
    </React.Fragment>
  );
};

export default tablePayouts;
