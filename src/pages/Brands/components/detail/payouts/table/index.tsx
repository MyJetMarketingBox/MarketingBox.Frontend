import React, { useState } from "react";
import ColumnActions from "../../../../../../components/UI/columnActions/ColumnActions";
import BootstrapTable from "react-bootstrap-table-next";
import { Currency, PayoutType } from "../../../../../../common/utils/model";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDelete from "../../../../../../components/UI/confirmDelete/ConfirmDelete";
import { updateBrand } from "../../../../../../store/brands/profile/actions";

export default (props : any ) => {

  console.log(props);
  const { payouts } = props

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const { brandProfile } = useSelector((state: any) => {
    return {
      brandProfile: state.BrandProfile.brand
    }
  })

  const resPayouts = payouts.map((payout : any) => {
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
        year: "2-digit"
      }),
      updatedDate: new Date(payout.modifiedAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }) ,
    }
  })

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  const handleDeleteBrandPayout = (payoutId : number) => {
    const {payouts, campaignRows, integration, id, ...currBrand} = brandProfile

    const currPayouts = payouts.filter((item : any) => {
      return item.id != payoutId
    }).map((item : any) => {
      return item.id
    })

    currBrand.brandPayoutIds = currPayouts;
    currBrand.integrationId = integration?.id;

    dispatch(updateBrand(currBrand, id))
  }

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
          id={row.id}
          items={listActions}
        />
      )
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px", "word-break": "break-word" },
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
      text: "Geo Box",
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
        data={resPayouts}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle"}
        headerWrapperClasses={"thead-light"}
      />

      <ConfirmDelete isOpen={isOpen} toggle={toggleAction} handleDelete={handleDeleteBrandPayout} id={selectId} />

    </React.Fragment>
  )
}