import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteCampaign } from "../../../store/campaigns/actions";

const CardCampaigns = (props : any) => {
  const { campaign } = props;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCampaign(campaign.id))
  }

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody>
            <UncontrolledDropdown className="dropdown text-end">
              <DropdownToggle className="text-muted font-size-16" tag="a">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem to="#">Edit</DropdownItem>
                <DropdownItem to="#">Action</DropdownItem>
                <DropdownItem to="#">Remove</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <div className="avatar-xl mx-auto mb-4">
              <span
                className={
                  "avatar-title bg-soft-light text-light display-4 m-0 rounded-circle"
                }
              >
                <i className="bx bxs-user-circle" style={{"color":"#7b746f"}}></i>
              </span>
            </div>

            <h5 className="font-size-15 mb-1">
              <Link to={`campaign/${campaign.id}`} className="text-dark">
                {campaign.name}
              </Link>
            </h5>
            <p className="text-muted mb-2">
              Campaign ID (gi): {campaign.id}
            </p>
          </CardBody>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-light text-truncate"
            >
              <i className="uil uil-user me-1"></i> Detail
            </button>
            <button
              type="button"
              className="btn btn-outline-light text-truncate"
              onClick={handleDelete}
            >
              <i className="uil uil-envelope-alt me-1"></i> Delete
            </button>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default CardCampaigns
