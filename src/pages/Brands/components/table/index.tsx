import ColumnActions from "../../../Affiliates/components/columnActions/ColumnActions";
import BootstrapTable from "react-bootstrap-table-next";
import { brandPrivacy, brandStatus, Currency, plan } from "../../../../common/utils/model";
import { useDispatch } from "react-redux";

import {updateBrand as onUpdateBrand} from "../../../../store/actions";

export default ({ brands = []} : any ) => {
  const dispatch = useDispatch()

  // @ts-ignore
  const brandsData = brands.map( brand  => {
    let color;
    switch (brand.status) {
      case 0:
        color = "success";
        break;
      case 1:
        color = "danger";
        break;
    }

    return {
      id: brand.id,
      name: brand.name,
      integrationId: brand.integrationId,
      status: brand.status,
      color: color,
      payout: brand.payout,
      revenue: brand.revenue,
      privacy: brand.privacy
    }

  });

  const handleChangePrivacy = (e: any) => {
    e.preventDefault();

    const brand = brands.find((item:any) => {
      return item.id == e.target.id;
    })

    const {id, ...newBrand} = brand;

    newBrand.privacy = (newBrand.privacy === 0 ) ? 1 : 0;
    dispatch(onUpdateBrand(newBrand, id))
  }

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.id} />
      )
    },
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "integrationId",
      text: "Integration ID",
      sort: true
    },
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
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cell: any, row: any) => (
        <>
          <div
            className={"badge badge-soft-" + row.color + " font-size-12"}
          >
            {brandStatus[row.status]}
          </div>
        </>
      )
    },
    {
      dataField: "privacy",
      text: "Privacy",
      sort: false,
      formatter: (cell: any, row: any) => {
        return (
          <div className="form-check form-switch" dir="ltr">
            <input type="checkbox" className={"form-check-input"} id={row.id} defaultChecked={row.privacy} onClick={handleChangePrivacy}/>
            {brandPrivacy[row.privacy]}
          </div>
        )
      }
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];



  return (
    <>
      <BootstrapTable
        keyField='id'
        data={brandsData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap"}
        headerWrapperClasses={"thead-light"}
      />
    </>
  );
}