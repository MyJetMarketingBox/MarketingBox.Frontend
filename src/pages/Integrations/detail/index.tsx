import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIntegration } from "../../../store/integrations/actions";

const IntegrationDetail = (props: any) => {
  const dispatch = useDispatch();

  const {
    match: { params },
  } = props;

  const { item } = useSelector( (state: any) => ({
    item: state.Integrations.item
  }));


  useEffect(() => {
    dispatch(getIntegration(params.id))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        {item.name}
      </div>
    </React.Fragment>
  )
}

export default IntegrationDetail;