import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addCampaign, editCampaign } from "../../../../store/campaigns/actions";
import { CampaignTabsEnum } from "src/enums/CampaignTabsEnum";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { addGeo, getGeo } from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  data: any;
}

interface IFormValues {
  name: string;
}

const EditCampaignForm = ({ data, isOpen, toggle }: Props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(data.name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleValidSubmit = () => {
    dispatch(
      editCampaign({
        id: data.id,
        name,
      })
    );

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} tag="h4">
        Edit Campaign
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleValidSubmit}>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="name"
                  label="Name"
                  type="text"
                  errorMessage="Invalid name"
                  value={name}
                  onChange={handleChange}
                  validate={{
                    required: { value: true },
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex">
                <button type="submit" className="mr-10 btn custom-btn-success">
                  Save
                </button>

                <button type="submit" className="btn custom-btn-light">
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

export default EditCampaignForm;
