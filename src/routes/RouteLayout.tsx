import React, { FC } from "react";
import { matchPath, Redirect, Route, Switch, useLocation } from "react-router";
import { RouteLayoutTypeEnum } from "../enums/RouteLayoutTypeEnum";
import routesList from "./allRoutes";
import RouteWrapper from "./RouteWrapper";

import VerticalLayout from "../components/VerticalLayout/";
import NonAuthLayout from "../components/NonAuthLayout";
import Page from "../constants/pages";

const RouteLayout: FC = () => {
  const location = useLocation();

  const allRoutes = routesList.map(route => (
    <RouteWrapper key={route.path} {...route} />
  ));

  const currentRoute = routesList.find(item => {
    const match = matchPath(location.pathname, item.path);
    return match && match.isExact;
  });

  let layoutType = RouteLayoutTypeEnum.Page404;

  if (currentRoute) {
    layoutType = currentRoute.layoutType;
  }

  switch (layoutType) {
    case RouteLayoutTypeEnum.Authorized:
      return (
        <VerticalLayout>
          {!location.search && (
            <Redirect to={location.pathname.replace(/\/+$/, "")} />
          )}
          <Switch>{allRoutes}</Switch>
        </VerticalLayout>
      );

    case RouteLayoutTypeEnum.SignFlow:
      return (
        <NonAuthLayout>
          {!location.search && (
            <Redirect to={location.pathname.replace(/\/+$/, "")} />
          )}
          <Switch>{allRoutes}</Switch>
        </NonAuthLayout>
      );

    case RouteLayoutTypeEnum.Page404:
      return <Redirect to={Page.DASHBOARD} />;
    default:
      return (
        <>
          {!location.search && (
            <Redirect to={location.pathname.replace(/\/+$/, "")} />
          )}
          <Switch>{allRoutes}</Switch>
        </>
      );
  }
};

export default RouteLayout;
