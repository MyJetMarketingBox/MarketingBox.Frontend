import { useDispatch } from "react-redux";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addCampaign } from "../../../../store/campaigns/actions";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const handleValidSubmit = (values: any) => {
    const campaign = {
      name: values["name"],
    };

    dispatch(addCampaign(campaign));
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} tag="h4">
        Add Campaign
      </ModalHeader>
      <ModalBody>
        <AvForm
          onValidSubmit={(e: any, values: any) => {
            handleValidSubmit(values);
          }}
        >
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="name"
                  label="Name"
                  type="text"
                  errorMessage="Invalid name"
                  validate={{
                    required: { value: true },
                  }}
                  value=""
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
