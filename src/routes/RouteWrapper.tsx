import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { RootStoreType } from "src/store/storeTypes";
import { LOCAL_STORAGE_AUTH_USER } from "../constants/localStorageKeys";
import Page from "../constants/pages";
import { RouteLayoutTypeEnum } from "../enums/RouteLayoutTypeEnum";
import { RouteItemsType } from "../types/RouteItemsType";

const RouteWrapper: FC<RouteItemsType> = props => {
  const { component: Component, layoutType, ...otherProps } = props;

  const { isAuthUser } = useSelector((store: RootStoreType) => ({
    isAuthUser: store.login.isAuthorization,
  }));

  switch (layoutType) {
    case RouteLayoutTypeEnum.Authorized:
      if (!isAuthUser) {
        return <Redirect to={Page.SIGN_IN} />;
      }
      break;
    case RouteLayoutTypeEnum.SignFlow:
      if (isAuthUser) {
        return <Redirect to={Page.DASHBOARD} />;
      }
      break;
    default:
      break;
  }

  return (
    <Route
      {...otherProps}
      render={routeProps => <Component {...routeProps} />}
    />
  );
};

export default RouteWrapper;
