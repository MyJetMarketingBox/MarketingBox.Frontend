import { useDispatch } from "react-redux";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import {addIntegration} from "../../../../store/integrations/actions";

export default ({ isOpen, toggle }: any) => {

  const dispatch = useDispatch();

  const handleValidSubmit = (values: any) => {
    const integration = {
      name: values["name"],
    };

    dispatch(addIntegration(integration));
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        Add Integration
      </ModalHeader>

      <ModalBody>
        <AvForm
          onValidSubmit={(
            e: any,
            values: any
          ) => {
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
                    required: { value: true }
                  }}
                  value=""
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-success save-user"
                >
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </AvForm>
      </ModalBody>
    </Modal>
  )

}