import {
  CardText,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { httpQueryType } from "../../../../common/utils/model";
import LabelInput from "../../../../components/UI/FormElements/LabelInput";
import ValidationText from "../../../../constants/validationText";
import { useFormik } from "formik";
import * as yup from "yup";
import LabelSelect from "../../../../components/UI/FormElements/LabelSelect";
import { clearAffiliate, getAffiliates } from "../../../../store/affiliates/actions";
import Select from "../../../../components/UI/select";
import { addPostback, updatePostback } from "../../../../store/postback/actions";

interface IPostback {
  registrationReference: string,
  registrationTGReference: string,
  depositReference: string,
  depositTGReference: string,
  httpQueryType: number,
  affiliateId: number,
}

export default ({ isOpen, toggle, postbackId}: any) => {
  const dispatch = useDispatch();

  const [customActiveTab, setcustomActiveTab] = useState("1");

  const {postback, addLoading, upLoading, affiliates, loadingAffList} = useSelector((state: any) => {
    return {
      postback: state.Postbacks.data.items.find((item: any) => {
        return item.id === postbackId;
      }),
      addLoading : state.Postbacks.addLoading,
      upLoading: state.Postbacks.upLoading,
      affiliates: state.Affiliates.affiliates.items,
      loadingAffList: state.Affiliates.loading,
    }
  })

  useEffect(() => {
    if(postbackId === 0) {
      dispatch(getAffiliates("", {}));

      return () => {
        dispatch(clearAffiliate());
      };
    }
  }, [postbackId])

  const validationSchema: yup.SchemaOf<any> = yup
    .object()
    .shape({
      registrationReference: yup.string()
        .matches(/^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i, ValidationText.invalidInput),
      registrationTGReference: yup.string()
        .matches(/^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i, ValidationText.invalidInput),
      depositReference: yup.string()
        .matches(/^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i, ValidationText.invalidInput),
      depositTGReference: yup.string()
        .matches(/^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i, ValidationText.invalidInput),
      httpQueryType: yup.number().required(ValidationText.required),
      affiliateId: yup.number().required(ValidationText.required),
    });

  const initialValues:IPostback = useMemo(() => {
    return {
      registrationReference: postback?.registrationReference || "",
      registrationTGReference:postback?.registrationTGReference || "",
      depositReference: postback?.depositReference || "",
      depositTGReference: postback?.depositTGReference || "",
      httpQueryType: postback?.httpQueryType,
      affiliateId:  postback?.affiliateId,
    }
  }, [postback]);

  const handleSubmitForm = () => {
      let postback: any = {
        registrationReference: values.registrationReference,
        registrationTGReference: values.registrationTGReference,
        depositReference: values.depositReference,
        depositTGReference: values.depositTGReference,
        httpQueryType: +values.httpQueryType
      };

      if(postbackId > 0){
        dispatch(updatePostback(postback, postbackId)) // update postback
      }else{
        postback.affiliateId = +values.affiliateId;
        dispatch(addPostback(postback)); // save new postback
      }
  }

  let {
    values,
    validateForm,
    handleChange,
    submitForm,
    handleBlur,
    errors,
    touched,
    isValid,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  const handlerClickSubmit = async () => {
    const curErrors = await validateForm();
    const curErrorsKeys = Object.keys(curErrors);
    if (curErrorsKeys.length) {
      const el = document.getElementById(curErrorsKeys[0]);
      if (el) el.focus();
    }
    submitForm();
  };

  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const affiliateList = affiliates.map((item: any) => {
    return {
      value: item.id,
      label: item.generalInfo.username,
    };
  });

  const handleChangeSelect = (name: string, value: any) => {
    setFieldValue(name, value.value)
  }


  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)} centered={true}>
      <ModalHeader toggle={() => toggle(false)} tag="h4">
        {postbackId > 0 ? "Edit postback" : "Add Postback"}
      </ModalHeader>

      <Form>
        <ModalBody>
          <Row>
            <Col xs={12}>
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    <span className="d-sm-block">Lead</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    <span className="d-sm-block">Deposit</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={customActiveTab}
                className="p-3 text-muted"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <LabelInput
                          label="Enter lead URL"
                          placeholder="Enter lead URL"
                          name="registrationReference"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.registrationReference?.trim() || ""}
                          hasError={!!(errors.registrationReference && touched.registrationReference)}
                          errorText={errors.registrationReference}
                        />
                      </div>
                      <div className="mb-3">
                        <LabelInput
                          label="URL TG"
                          placeholder="URL TG"
                          name="registrationTGReference"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.registrationTGReference?.trim() || ""}
                          hasError={!!(errors.registrationTGReference && touched.registrationTGReference)}
                          errorText={errors.registrationTGReference}
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <div className="mb-3">
                        <LabelInput
                          label="Enter deposit URL"
                          placeholder="Enter deposit URL"
                          name="depositReference"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.depositReference?.trim() || ""}
                          hasError={!!(errors.depositReference && touched.depositReference)}
                          errorText={errors.depositReference}
                        />
                      </div>
                      <div className="mb-3">
                        <LabelInput
                          label="Enter deposit URL TG"
                          placeholder="Enter deposit URL TG"
                          name="depositTGReference"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.depositTGReference?.trim() || ""}
                          hasError={!!(errors.depositTGReference && touched.depositTGReference)}
                          errorText={errors.depositTGReference}
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>

          <Row>
            {postbackId === 0 &&
              <Col xs={12}>
                <div className="p-3 custom-react-select">
                  {/*<div className="react-select-descr">Affiliates</div>*/}
                  <Select
                    isSearchable
                    isLoading={loadingAffList}
                    options={affiliateList}
                    onChange={(value: any) => handleChangeSelect("affiliateId", value)}
                    value={affiliateList.find((item: any) => item.value === values?.affiliateId) }
                    placeholder="Affiliates *"
                  />
                </div>
              </Col>
            }
            <Col xs={12}>
              <div className="p-3">
                <LabelSelect
                  name="httpQueryType"
                  label="Query Type*"
                  value={`${values.httpQueryType}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasError={!!(errors.httpQueryType && touched.httpQueryType)}
                  errorText={errors.httpQueryType}
                >
                  <option value="" key={0}>
                    Select query type
                  </option>
                  {httpQueryType.map((item, idx) => {
                    return (
                      <option value={idx} key={idx + 1}>
                        {item}
                      </option>
                    );
                  })}
                </LabelSelect>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btnOrange btn-width-250"
                  onClick={handlerClickSubmit}
                  disabled={upLoading || addLoading || !isValid}
                >
                  {(upLoading || addLoading) && <i className="bx bx-hourglass bx-spin me-2"/>}
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
