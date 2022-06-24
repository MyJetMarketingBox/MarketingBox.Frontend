import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import Page from "src/constants/pages";
import { AffiliateAccStatusEnum } from "src/enums/AffiliateAccStatusEnum";
import { getProfile } from "src/store/actions";
import { RootStoreType } from "src/store/storeTypes";

const AuthContainer: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { push, location } = useHistory();

  const isConfirmEmailPage = useRouteMatch([Page.CONFIRM_EMAIL])?.isExact;

  const { userInfoLoading, isAuthUser, userId, userInfo } = useSelector(
    (store: RootStoreType) => ({
      isAuthUser: store.authUser.isAuthorization,
      userId: store.authUser.userInfo?.["user-id"] || "",
      userInfo: store.Profile.data?.generalInfo || null,
      userInfoLoading: store.Profile.loading,
    })
  );

  useEffect(() => {
    if (
      isAuthUser &&
      userInfo?.state === AffiliateAccStatusEnum.NotActive &&
      !isConfirmEmailPage
    ) {
      push(Page.CONFIRM_EMAIL);
    }

    if (isAuthUser && userId && !userInfo && !userInfoLoading) {
      dispatch(getProfile(+userId));
    }
  }, [isAuthUser, userId, userInfo, location]);

  return <>{children}</>;
};

export default AuthContainer;
