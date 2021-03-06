import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import { useState } from "react";
import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";
import { deleteAffiliate } from "../../../../store/affiliates/actions";
import Page from "../../../../constants/pages";

export default ({ affiliates = [] }: any) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const history = useHistory();

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  const handleDeleteAffiliate = (id: number) => {
    dispatch(deleteAffiliate(id));
  };

  // @ts-ignore
  const affiliateData = affiliates.map(affiliate => {
    let color, status;
    switch (affiliate.generalInfo?.state) {
      case 0:
        status = "active";
        color = "success";
        break;
      case 2:
        status = "notActive";
        color = "warning";
        break;
      case 1:
        status = "banned";
        color = "danger";
        break;
      default:
        color = "light";
        break;
    }

    return {
      id: affiliate.id,
      username: affiliate.generalInfo.username,
      ai: affiliate.id,
      email: affiliate.generalInfo.email,
      reportto: "Management",
      createdat: new Date(affiliate.createdAt).toLocaleDateString(
        "ru-RU",
        {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }
      ),
      status: status,
      actions: "",
      color: color,
    };
  });

  const listActions: any = [
    {
      label: "edit",
      handler: (id: any) => {
        history.push(`${Page.AFFILIATES}/${id}`);
      },
    },
    /*{
      label: "delete",
      handler: (id: any) => {
        setIsOpen(true);
        setSelectId(id);
      },
    },*/
  ];

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      headerStyle: { width: "70px", minWidth: "70px" },
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.id} items={listActions} />
      ),
    },
    {
      dataField: "username",
      text: "Username",
      sort: true,
      /*headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px" },*/
    },
    {
      dataField: "ai",
      text: "AI",
    },
    {
      dataField: "email",
      text: "Email",
      /*headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px" },*/
    },
    {
      dataField: "reportto",
      text: "Report To",
    },
    {
      dataField: "createdat",
      text: "Created At",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cellContent: any, productData: any) => (
        <>
          <div
            className={
              "badge badge-soft-" + productData.color + " font-size-12"
            }
          >
            {productData.status}
          </div>
        </>
      ),
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const classesWrapper = ["table-responsive"]
  if(affiliateData.length === 1){
    classesWrapper.push('pb-10');
  }

  return (
    <div className="pb-5 pointer">
      <div className={classesWrapper.join(' ')}>
        <BootstrapTable
          keyField="ai"
          data={affiliateData}
          columns={columns}
          bordered={false}
          striped={false}
          defaultSorted={defaultSorted}
          classes={"table align-middle table-nowrap table-hover un-pointer-tr"}
          headerWrapperClasses={"thead-light"}
        />
      </div>

      <ConfirmDelete
        isOpen={isOpen}
        toggle={toggleAction}
        handleDelete={handleDeleteAffiliate}
        id={selectId}
      />
    </div>
  );
};
