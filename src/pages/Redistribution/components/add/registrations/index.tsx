import React, { useEffect } from "react";
import { CardBody, Col, Row } from "reactstrap";
import Filter from "../../../../Registrations/components/filter/Filter";
import TableReg from "../../../../Registrations/components/table/TableRegistrations";
import BtnLoadMore from "../../../../../components/UI/btns/BtnLoadMore";
import { clearRegistrations, getRegistrations } from "../../../../../store/registrations/actions";
import { useDispatch, useSelector } from "react-redux";

export default ({selected, setRegId, clearState} : any) => {

  const dispatch = useDispatch();

  const { registrations, loading, loaded, nextURL, total } = useSelector((state: any) => {
    return {
      registrations: state.Registrations.registrations.items,
      nextURL: state.Registrations.registrations.pagination.nextUrl,
      total: state.Registrations.registrations.pagination.total,
      errorReg: state.Registrations.error,
      loading: state.Registrations.loading,
      loaded: state.Registrations.loaded,
      layoutMode: state.Layout.layoutMode
    }
  });

  let filter = {
    order: 1, //DESC
    type: 2, //all
    limit: 50
  }

  useEffect(() => {
    dispatch(getRegistrations('', filter))
    return () => {
      dispatch(clearRegistrations());
      clearState();
    }
  }, []);

  async function loadMore() {
    if(nextURL) {
      dispatch(getRegistrations(nextURL, {}));
    }
  }


  return (
    <Row>
      <Col className="col-12">

        <Row className="mb-4">
          <Filter selected={selected}/>
          <div className="col-xl-12 mb-3 text-muted">
            Showing {registrations.length} / {total} results
          </div>
        </Row>

        <Row className="mb-4">
          <Col xl="12">
            <div className="table-responsive">
              {registrations.length ? <TableReg registrations={registrations}  selected={selected} setRegId={setRegId}/> : null }
              {
                (!registrations.length && loaded) ?
                  <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                    <h3>No Data Available</h3>
                  </div> : null
              }
            </div>
          </Col>
        </Row>

        {nextURL &&
        <Row>
          <Col xs="12">
            <div className="text-center">
              <BtnLoadMore
                loading={loading}
                handeClick={loadMore}
              />
            </div>
          </Col>
        </Row>
        }

      </Col>
    </Row>
  )

}