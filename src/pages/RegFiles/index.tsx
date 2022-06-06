import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./components/search"
import { Col, Row } from "reactstrap";
import { clearRegFiles, getRegFiles } from "../../store/regFiles/actions";
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import Table from "./components/table"
import AddModal from "./components/modal/add"
import ChangeStatus from "../../components/UI/modal/changeStatus/changeStatusRedistribution";

const RegFiles = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const {total, dataList, loaded, loading, nextUrl } = useSelector((state: any) => {
    return {
      loading: state.RegFiles.loading,
      loaded: state.RegFiles.loaded,
      dataList: state.RegFiles.data.items,
      nextUrl: state.RegFiles.data.pagination.nextUrl,
      total: state.RegFiles.data.pagination.total
    }
  })


  const filter = {
    order: 1,
    limit: 50
  }

  useEffect(() => {
    dispatch(getRegFiles('', filter))

    return () => {
      dispatch(clearRegFiles())
    }
  }, [])


  async function loadMore() {
    if(nextUrl){
      dispatch(getRegFiles(nextUrl, {}))
    }
  }

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };


  return(
    <React.Fragment>
      <Row className="mb-4">
        <Col className="col-xs-12 col-md-6 col-xl-4 mb-3">
          <Search />
        </Col>
        <Col className="col-xs-12 col-md-6 col-xl-8 text-end">
          <button
            type="button"
            className="btn btnOrange"
            onClick={toggleModal}
          >
            Add New
          </button>
        </Col>
        <div className="col-xl-12 text-muted">
          Showing {dataList.length} / {total} results
        </div>
      </Row>

      <Row className="mb-4">
        <Col xl="12">
          <div className="table-responsive">
            {dataList.length ? <Table data={dataList} /> : null}
            {
              (!dataList.length && loaded)
                ? <div style={{ "textAlign": "center", "padding": "30px 0" }}>
                  <h3>No Data Available</h3>
                </div>
                : null
            }
          </div>
        </Col>
      </Row>

      {nextUrl &&
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

      <AddModal
        isOpen={isOpen}
        toggle={toggleModal}
      />

    </React.Fragment>
  )

}

export default RegFiles;