import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addCampaign } from "../../../../store/campaigns/actions";
import { CampaignTabsEnum } from "src/enums/CampaignTabsEnum";
import { useEffect, useMemo } from "react";
import { addGeo, getGeo } from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";

interface Props {
  isOpen: boolean;
  formType: CampaignTabsEnum;
  toggle: () => void;
}

interface IFormValues {
  name: string;
  geoId: string;
}

const AddCampaignOrGeoForm = ({ isOpen, formType, toggle }: Props) => {
  const dispatch = useDispatch();

  const { geo } = useSelector((store: RootStoreType) => ({
    geo: store.Geo,
  }));

  const handleValidSubmit = (values: IFormValues) => {
    switch (formType) {
      case CampaignTabsEnum.Campaign:
        dispatch(
          addCampaign({
            name: values.name,
          })
        );
        break;

      default:
        const data = {
          name: values.name,
          countryIds: geo.geo.items.find(item => item.id === +values.geoId)
            ?.countryIds,
        };

        dispatch(addGeo(data));
        break;
    }

    toggle();
  };

  const formTitle = useMemo(() => {
    switch (formType) {
      case CampaignTabsEnum.Campaign:
        return "Add Campaign";

      default:
        return "Add Geo";
    }
  }, [formType]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} tag="h4">
        {formTitle}
      </ModalHeader>
      <ModalBody>
        <AvForm
          onValidSubmit={(e: any, values: IFormValues) => {
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
                />
              </div>
            </Col>

            {formType === CampaignTabsEnum.Geo && (
              <Col xs={12}>
                <div className="mb-3">
                  <AvField
                    name="geoId"
                    label="Country"
                    type="select"
                    errorMessage="Invalid name"
                    validate={{
                      required: { value: true },
                    }}
                  >
                    {geo.loaded &&
                      geo.geo.items.map(item => (
                        <option
                          key={`geo-id-${item.id / Math.random()}`}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                  </AvField>
                </div>
              </Col>
            )}
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

export default AddCampaignOrGeoForm;
