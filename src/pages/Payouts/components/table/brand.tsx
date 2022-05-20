import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBrandPayouts,
  getBrandPayouts,
} from "../../../../store/brandPayouts/actions";
import { Col, Row } from "reactstrap";
import BtnLoadMore from "../../../../components/UI/btns/BtnLoadMore";
import { Currency, PayoutType } from "../../../../common/utils/model";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import BootstrapTable from "react-bootstrap-table-next";

export default () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const { brandPayouts, loadingList, loadedList, nextUrl } = useSelector(
    (state: any) => {
      return {
        brandPayouts: state.BrandPayouts.brandPayouts.items,
        nextUrl: state.BrandPayouts.brandPayouts.pagination.nextUrl,
        loadingList: state.BrandPayouts.brandPayouts.loadingList,
        loadedList: state.BrandPayouts.brandPayouts.loadedList,
      };
    }
  );

  let filter = {
    order: 1,
    limit: 50,
  };

  useEffect(() => {
    dispatch(getBrandPayouts("", filter));
    return () => {
      dispatch(clearBrandPayouts());
    };
  }, []);

  async function loadMore() {
    if (nextUrl) {
      dispatch(getBrandPayouts(nextUrl, {}));
    }
  }

  const resPayouts = brandPayouts.map((payout: any) => {
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
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: { width: "250px", minWidth: "250px" },
      style: { width: "250px", minWidth: "250px" },
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
      style: { width: "250px", minWidth: "250px" },
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
      <Row className="mb-4">
        <div className="table-responsive">
          <BootstrapTable
            keyField="id"
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

      {nextUrl && (
        <Row>
          <Col className="col-12">
            <div className="text-center">
              <BtnLoadMore loading={loadingList} handeClick={loadMore} />
            </div>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
