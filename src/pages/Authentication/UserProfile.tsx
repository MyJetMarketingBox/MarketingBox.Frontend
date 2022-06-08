import MetaTags from "react-meta-tags";
import React, { useEffect } from "react";
import { Alert, Button, Card, CardBody, Col, Container, Row } from "reactstrap";
// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation";
//redux
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
// actions
import { clearAffProfile, editProfile, getAffiliateProfile } from "../../store/actions";
import { RootStoreType } from "src/store/storeTypes";
import ProfileChangePassword from "./component/ProfileChangePassword";
import { avaLetters } from "../../helpers/avaLetters";
import Loader from "../../components/UI/loader";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { error, authUserID, loading, loaded, authUserName, profile } = useSelector((state: RootStoreType) => ({
    error: state.AffProfile.error,
    profile: state.AffProfile.affProfile,
    loading: state.AffProfile.loading,
    loaded: state.AffProfile.loaded,
    authUserID: state.login.userInfo['user-id'],
    authUserName: state.login.userInfo['user-name'],
  }));

  /*const [email, setemail] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [idx, setidx] = useState<number>(1);*/

  /*useEffect(() => {
    const authUser: any = localStorage.getItem(LOCAL_STORAGE_AUTH_USER);
    if (authUser) {
      const obj = JSON.parse(authUser);

      setname(obj.username);
      setemail(obj.email);
      setidx(obj.uid);

      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);*/

  useEffect(() => {
    dispatch(getAffiliateProfile(authUserID));

    return () => {
      dispatch(clearAffProfile());
    }
  }, [])


  function handleValidSubmit(event: any, values: any) {
    dispatch(editProfile(values));
  }

  return (
    <React.Fragment>
      { !loaded && loading && <Loader /> }
      <div className="page-content">
        <MetaTags>
          <title>Profile | TraffMe</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb title="TraffMe" breadcrumbItem="Profile" />

          {loaded && (
            <>
              <Row>
                <Col lg="12">

                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <div className="ms-3">
                          <div className="avatar">
                            <div className="avatar_letters">
                              {avaLetters(authUserName)}
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1 align-self-center ms-3">
                          <div className="text-muted">
                            <h5>{profile?.generalInfo.username}</h5>
                            <p className="mb-1">{profile?.generalInfo.email}</p>
                            <p className="mb-0">Id no: #{authUserID}</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <h4 className="card-title mb-4">Change User Name</h4>

              <Card>
                <CardBody>
                  <AvForm
                    className="form-horizontal"
                    onValidSubmit={(e: any, v: any) => {
                      handleValidSubmit(e, v);
                    }}
                  >
                    <div className="form-group">
                      <AvField
                        name="username"
                        label="User Name"
                        value="name"
                        className="form-control"
                        placeholder="Enter User Name"
                        type="text"
                        required
                      />
                      <AvField name="idx" value={authUserID} type="hidden" />
                    </div>
                    <div className="text-center mt-4">
                      <Button type="submit" color="danger">
                        Update User Name
                      </Button>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>

              <ProfileChangePassword />
            </>
          )}

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
