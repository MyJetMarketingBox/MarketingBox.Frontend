import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addNewAffiliate } from "../../../../store/actions";
import { AffiliateRole, AffiliateState, Currency } from "../../../../common/utils/model";
import Loader from "../../../../components/UI/loader";

export default ({ isOpen, toggle }: any) => {

  const dispatch = useDispatch();
  const { addAffLoading, addAffSuccess, addAffError } = useSelector((state: any) => {
    return {
      addAffLoading: state.Affiliates.addAffLoading,
      addAffSuccess: state.Affiliates.addAffSuccess,
      addAffError: state.Affiliates.addAffError,
    }
  });

  useEffect(() => {
    if (addAffSuccess) {
      toggle();
    }
  }, [addAffSuccess]);

  useEffect(() => {
    if (addAffError) {
      // showError
    }
  }, [addAffError]);

  const handleValidAffiliateSubmit = (values: any) => {
    const date = new Date();
    const newAffiliate = {
      generalInfo: {
        username: values["username"],
        email: values["email"],
        password: values["password"],
        phone: "",
        skype: "",
        zipCode: "",
        role: +values["role"],
        state: +values["state"],
        currency: +values["currency"],
        createdAt: date,
        apiKey: ""
      },
      company: {
        name: "",
        address: "",
        regNumber: "",
        vatId: ""
      },
      bank: {
        beneficiaryName: "",
        beneficiaryAddress: "",
        bankName: "",
        bankAddress: "",
        accountNumber: "",
        swift: "",
        iban: ""
      }
    };
    // save new aff
    dispatch(addNewAffiliate(newAffiliate));
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        {addAffLoading && <Loader />}
        <ModalHeader toggle={toggle} tag="h4">
          Add Affiliate
        </ModalHeader>
        <ModalBody>

          <AvForm
            onValidSubmit={(
              e: any,
              values: any
            ) => {
              handleValidAffiliateSubmit(values);
            }}
          >
            <Row form>
              <Col xs={12}>
                <div className="mb-3">
                  <AvField
                    name="username"
                    label="Name"
                    type="text"
                    errorMessage="Invalid name"
                    validate={{
                      required: { value: true }
                    }}
                    value={""}
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    type="email"
                    errorMessage="Invalid Email"
                    validate={{
                      required: { value: true }
                    }}
                    value={""}
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="password"
                    label="Password"
                    type="password"
                    errorMessage="Invalid Designation"
                    validate={{
                      required: { value: true }
                    }}
                    value={""}
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    type="select"
                    name="role"
                    className="form-select"
                    label="Role"
                    required
                    value={""}
                  >
                    <option value={""}>Select role</option>
                    {
                      AffiliateRole.map((val, i) => <option key={i} value={i}>{val}</option>)
                    }
                  </AvField>
                </div>

                <div className="mb-3">
                  <AvField
                    type="select"
                    name="state"
                    className="form-select"
                    label="State"
                    required
                    value={""}
                  >
                    <option value={""}>Select sate</option>
                    {AffiliateState.map((val, i) => <option key={i}
                                                            value={i}>{val}</option>)}
                  </AvField>
                </div>

                <div className="mb-3">
                  <AvField
                    type="select"
                    name="currency"
                    className="form-select"
                    label="Currency"
                    required
                    value={""}
                  >
                    <option value={""}>Select sate</option>
                    {Currency.map((val, i) => <option key={i} value={i}>{val}</option>)}
                  </AvField>
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
    </>
  );
}
