import React, { useEffect, useState } from "react";
import { Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearIntegrations, getIntegrations } from "../../../../store/integrations/actions";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addBrand } from "../../../../store/brands/actions";
import { useHistory } from "react-router-dom";
import Select from "../../../../components/UI/select";

export default ({ isOpen, toggle }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [getIntegration, setIntegration] = useState({});
  const [valid, setValid] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { integrations, upLoadingBrand, addLoaded, loadingIntegration } = useSelector(
    (state: any) => {
      return {
        integrations: state.Integrations.value.items,
        loadingIntegration: state.Integrations.loading,
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
    return () => {
      dispatch(clearIntegrations());
    }
  }, []);

  useEffect(() => {
    if(name.length && Object.keys(getIntegration).length){
      setValid(true)
    }
  }, [name, getIntegration])

  const handleName = (e: any) => {
    setName(e.target.value)
  }

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
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <AvForm
        onValidSubmit={(e: any, values: any) => {
          handleValidBrandSubmit(values);
        }}
      >
      <ModalHeader toggle={toggle} tag="h4">
        Add Brand
      </ModalHeader>
      <ModalBody>
        <Row form>
          <Col xs={12}>
            <div className="mb-3">
              <Label>Name <span className="accent-color">*</span></Label>
              <AvField
                name="name"
                type="text"
                autoComplete="off"
                errorMessage="Invalid name"
                requried
                validate={{
                  required: { value: true, errorMessage: 'Please enter a name' },
                  pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
                }}
                onChange={handleName}
              />
            </div>

            <div className="mb-3 custom-react-select">
              <div className="react-select-descr">
                Integration <span className="accent-color">*</span>
              </div>
              <Select
                isSearchable
                isLoading={loadingIntegration}
                options={resIntegrations}
                onChange={setIntegration}
              />
            </div>
          </Col>
        </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btnOrange save-user"
                  disabled={upLoadingBrand || !valid}
                >
                  {upLoadingBrand && (
                    <i className="bx bx-hourglass bx-spin me-2" />
                  )}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};
