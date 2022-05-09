import React, { useState } from "react";

import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import BootstrapTable from "react-bootstrap-table-next";
import { brandPrivacy, brandStatus } from "../../../../common/utils/model";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { delBrand } from "../../../../store/actions";

import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";
import { updateBrand } from "../../../../store/brands/profile/actions";
import Page from "../../../../constants/pages";

export default ({ brands = [] }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const brandsData = brands.map((brand: any) => {
 
    let color;
    switch (brand.status) {
      case 0:
        color = "success";
        break;
      case 1:
        color = "danger";
        break;
    }

    let integrationName =
      brand.integration?.name && brand.integration?.name.length > 15
        ? brand.integration.name.substring(0, 15) + " ..."
        : brand.integration?.name;

    return {
      id: brand.id,
      name: brand.name,
      integration: integrationName,
      integrationID: brand.integration?.id,
      //integrationType: IntegrationType[brand.integrationType],
      status: brand.status,
      color: color,
      payout: brand.payouts?.payoutType,
      revenue: brand.revenue,
      privacy: brand.privacy,
    };
  });

  const listActions: any = [
    {
      label: "edit",
      handler: (id: any) => {
        history.push(`${Page.BRANDS}/${id}`);
      },
    },
    {
      label: "delete",
      handler: (id: any) => {
        setIsOpen(true);
        setSelectId(id);
      },
    },
  ];

  const handleChangePrivacy = (e: any) => {
    e.preventDefault();

    const brand = brands.find((item: any) => {
      return item.id == e.target.id;
    });

    const { id, ...newBrand } = brand;

    newBrand.privacy = newBrand.privacy === 0 ? 1 : 0;
    dispatch(updateBrand(newBrand, id));
  };

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  const handleDeleteBrand = (id: number) => {
    dispatch(delBrand(id));
  };

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
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "integration",
      text: "Integration",
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px", "word-break": "break-word" },
      sort: true,
    },
    {
      dataField: "integrationID",
      text: "Integration ID",
      sort: true,
    },
    /*{
      dataField: "integrationType",
      text: "Type",
      sort: true
    },*/
    {
      dataField: "revenue",
      text: "Revenue",
      sort: false,
      /*formatter: (cell: any, row: any) => {
        return (
          <>
            {row.revenue.amount +" "}
            {Currency[row.revenue.currency] +" "}
            {plan[row.revenue.plan]}
          </>
        )
      }*/
    },
    {
      dataField: "payout",
      text: "Payout",
      sort: false,
      /*formatter: (cell: any, row: any) => {
        return (
          <>
            {row.payout.amount +" "}
            {Currency[row.payout.currency] +" "}
            {plan[row.payout.plan]}
          </>
        )
      }*/
    },
    /*{
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cell: any, row: any) => (
        <>
          <div className={"badge badge-soft-" + row.color + " font-size-12"}>
            {brandStatus[row.status]}
          </div>
        </>
      ),
    },
    {
      dataField: "privacy",
      text: "Privacy",
      sort: false,
      formatter: (cell: any, row: any) => {
        return (
          <div className="form-check form-switch" dir="ltr">
            <input
              type="checkbox"
              className={"form-check-input"}
              id={row.id}
              defaultChecked={row.privacy}
              onClick={handleChangePrivacy}
            />
            {brandPrivacy[row.privacy]}
          </div>
        );
      },
    },*/
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={brandsData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle"}
        headerWrapperClasses={"thead-light"}
      />

      <ConfirmDelete
        isOpen={isOpen}
        toggle={toggleAction}
        handleDelete={handleDeleteBrand}
        id={selectId}
      />
    </>
  );
};
