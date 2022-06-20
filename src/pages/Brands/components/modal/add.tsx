import React, { useEffect, useState } from "react";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getIntegrations } from "../../../../store/integrations/actions";
import { AvField, AvForm } from "availity-reactstrap-validation";
import Select from "react-select";
import { addBrand } from "../../../../store/brands/actions";
import { useHistory } from "react-router-dom";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [getIntegration, setIntegration] = useState([]);

  const { integrations, upLoadingBrand, addLoaded } = useSelector(
    (state: any) => {
      return {
        integrations: state.Integrations.value.items,
        upLoadingBrand: state.Brands.addBrandsLoading,
        addLoaded: state.Brands.addBrandsLoaded,
      };
    }
  );

  let filter = {
    order: 1,
  };

  useEffect(() => {
    dispatch(getIntegrations("", filter));
  }, []);

  const resIntegrations = integrations.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const handleValidBrandSubmit = (data: any) => {
    const { value }: any = getIntegration;

    const sendBrand = {
      name: data.name,
      integrationType: 0,
      integrationId: +value,
    };

    dispatch(addBrand(sendBrand, history));
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          Add Brand
        </ModalHeader>
        <ModalBody>
          <AvForm
            onValidSubmit={(e: any, values: any) => {
              handleValidBrandSubmit(values);
            }}
          >
            <Row form>
              <Col xs={12}>
                <div className="mb-3">
                  <AvField
                    name="name"
                    label="Name*"
                    type="text"
                    autoComplete="off"
                    errorMessage="Invalid name"
                    validate={{
                      required: { value: true },
                    }}
                    value={""}
                  />
                </div>

                <div className="mb-3">
                  <Label>Integration*</Label>
                  <Select
                    isSearchable
                    isLoading={""}
                    options={resIntegrations}
                    onChange={setIntegration}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btnOrange"
                    disabled={upLoadingBrand}
                  >
                    {upLoadingBrand && (
                      <i className="bx bx-hourglass bx-spin me-2" />
                    )}
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </AvForm>
        </ModalBody>
      </Modal>
    </>
  );
};
