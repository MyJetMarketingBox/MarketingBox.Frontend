import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBrandPayouts, delBrandPayout,
  getBrandPayouts
} from "../../../../store/brandPayouts/actions";
import { Col, Row } from "reactstrap";
import BtnLoadMore from "../../../../components/UI/btns/BtnLoadMore";
import { Currency, PayoutType } from "../../../../common/utils/model";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import BootstrapTable from "react-bootstrap-table-next";
import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";

export default ({setPayoutId, toggle} : any) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);

  const { brandPayouts, loadingList, loadedList, nextUrl, total } = useSelector(
    (state: any) => {
      return {
        brandPayouts: state.BrandPayouts.brandPayouts.items,
        nextUrl: state.BrandPayouts.brandPayouts.pagination.nextUrl,
        total: state.BrandPayouts.brandPayouts.pagination.total,
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

  const toggleDelAction = () => {
    setIsOpen(prev => !prev);
  };

  const handleDeleteBrandPayout = (id: number) => {
    dispatch(delBrandPayout(id))
  }

  const resPayouts = brandPayouts.map((payout: any) => {
    return {
      id: payout.id,
      name: payout.name,
      amount: payout.amount,
      currency: Currency[payout.currency],
      payoutType: PayoutType[payout.payoutType]?.label,
      geo: payout.geo.name,
      createdDate: new Date(payout.createdAt).valueOf(),
      updatedDate: new Date(payout.modifiedAt).valueOf(),
    };
  });

  const tableRowEvents = {
    onClick: (e:any, row:any, rowIndex:any) => {
      if(e.target.classList.length == 0) {
        setPayoutId(row.id);
        toggle("", true);
      }
    }
  }

  const listActions: any = [
    {
      label: "edit",
      handler: (id: any) => {
        setPayoutId(id);
        toggle("", true);
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
      //headerStyle: { width: "250px", minWidth: "250px" },
      //style: { width: "250px", minWidth: "250px" },
    },
    {
      dataField: "currency",
      text: "Currency",
      sort: false,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: false,
    },
    {
      dataField: "payoutType",
      text: "Payout type",
      sort: false,
    },
    {
      dataField: "geo",
      text: "Geo",
      sort: false,
      //headerStyle: { width: "250px", minWidth: "250px" },
      //style: { width: "250px", minWidth: "250px" },
    },
    {
      dataField: "createdDate",
      text: "Created date",
      sort: true,
      formatter: (cell: any, row: any) =>{
        return new Date(row.createdDate).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      }
    },
    {
      dataField: "updatedDate",
      text: "Updated date",
      sort: true,
      formatter: (cell: any, row: any) => {
        return new Date(row.updatedDate).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      }
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

      <div className="col-xl-12 text-muted mt-3 mb-4">
        Showing {resPayouts.length} / {total} results
      </div>

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
            rowEvents={tableRowEvents}
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

      <ConfirmDelete
        isOpen={isOpen}
        toggle={toggleDelAction}
        handleDelete={handleDeleteBrandPayout}
        id={selectId}
      />
    </React.Fragment>
  );
};
