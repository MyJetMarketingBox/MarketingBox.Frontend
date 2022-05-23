import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGeo, getGeo } from "../../store/geo/actions";
import { Col, Row } from "reactstrap";
import Card from "./components/card"
import BtnLoadMore from "../../components/UI/btns/BtnLoadMore";
import SearchGeo from "./components/search";

const Geo = (props: any) => {

  const dispatch = useDispatch();

  const { geoList, nextUrl, loading, loaded, total } = useSelector((state: any) => {
    return {
      geoList: state.Geo.geo.items,
      nextUrl: state.Geo.geo.pagination.nextUrl,
      total: state.Geo.geo.pagination.total,
      loading: state.Geo.loading,
      loaded: state.Geo.loaded
    }
  })

  let filter = {
    order: 1,
    limit: 10
  }

  useEffect(() => {
    dispatch(getGeo('', filter))
    return () => {
      dispatch(clearGeo())
    }
  }, [])

  async function loadMore() {
    if (nextUrl) {
      dispatch(getGeo(nextUrl, filter))
    }
  }

  return (
    <React.Fragment>

      <Row>
        <Col className="col-md-4 mb-5">
          <SearchGeo />
        </Col>
      </Row>

      <Row>
        { geoList.map((geo: any) =>
            <Card data={geo} key={geo.id}/>
            )
        }
      </Row>

      {
        nextUrl &&
        <Row>
          <Col className="col-12">
            <div className="text-center">
              <BtnLoadMore
                loading={loading}
                handeClick={loadMore}
              />
            </div>
          </Col>
        </Row>
      }
    </React.Fragment>
  )

}

export default Geo;