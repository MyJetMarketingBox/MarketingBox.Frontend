import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import c from "./BtnLoadMore.module.scss";

interface Props {
  loading: boolean;
  handeClick: (e: ChangeEvent<HTMLButtonElement>) => void;
}
export default ({ loading, handeClick }: any) => {
  const classes = ["btn btn-light", c.textBtn];
  const { t } = useTranslation();

  return (
    <button type="button" className={classes.join(" ")} onClick={handeClick}>
      {loading ? <i className="bx bx-hourglass bx-spin me-2" /> : null}
      {t("Load more")}
    </button>
  );
};
