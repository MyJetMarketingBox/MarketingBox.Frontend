import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAffPayouts, getAffPayouts } from "../../../../store/affiliatePayouts/actions";
import Loader from "../../../../components/UI/loader";
import { Currency, PayoutType } from "../../../../common/utils/model";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import BootstrapTable from "react-bootstrap-table-next";
import { Col, Row } from "reactstrap";
import BtnLoadMore from "../../../../components/UI/btns/BtnLoadMore";

export default () => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const {affPayouts, loadingList, loadedList, nextUrl} = useSelector((state:any) => {
    return {
      affPayouts: state.AffPayouts.affPayouts.items,
      nextUrl: state.AffPayouts.affPayouts.pagination.nextUrl,
      loadingList : state.AffPayouts.affPayouts.loadingList,
      loadedList : state.AffPayouts.affPayouts.loadedList
    }
  })

  let filter = {
    order: 1,
    limit: 50
  }

  useEffect(() => {
    dispatch(getAffPayouts('', filter))
    return () => {
      dispatch(clearAffPayouts())
    }
  }, []);

  async function loadMore () {
    if(nextUrl){
      dispatch(getAffPayouts(nextUrl, {}))
    }
  }

  const resPayouts = affPayouts.map((payout : any) => {
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

  const listActions: any = [
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
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px", "word-break": "break-word" },
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
      { !loadedList && loadingList && <Loader /> }
      <Row className="mb-4">
        <div className="table-responsive">
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
        </div>
      </Row>

      {
        nextUrl &&
        <Row>
          <Col className="col-12">
            <div className="text-center">
              <BtnLoadMore
                loading={loadingList}
                handeClick={loadMore}
              />
            </div>
          </Col>
        </Row>
      }

    </React.Fragment>
  )
}