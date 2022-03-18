import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { clearPostback, getPostback } from "../../store/postback/actions";

const Postback: React.FC = () => {
  const dispatch = useDispatch();

  const {postback} = useSelector((state:any ) => {
    return {
      postback: state.Postback.postbackItem
    }
  });

  useEffect(() => {
    dispatch(getPostback())
    return () => {
      dispatch(clearPostback())
    }
  }, []);

  //console.log(postback);


  return (
    <React.Fragment>
      <div className="page-content">

        <MetaTags>
          <title>Postback | TraffMe </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="TraffMe" breadcrumbItem="Postback" />
        </div>


      </div>
    </React.Fragment>
  )

}

export default Postback;