import React from "react";
import c from './BtnLoadMore.module.scss';

export default ({ loading, handeClick }: any) => {

  const classes = ['btn btn-light', c.textBtn];

  return (
    <button type="button" className={classes.join(' ')} onClick={handeClick}>
      {
        loading
          ? <i className="bx bx-hourglass bx-spin me-2" />
          : null
      }
      Load more
    </button>
  );
}
