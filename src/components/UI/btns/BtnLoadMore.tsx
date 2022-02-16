import React from "react";
import c from './BtnLoadMore.module.scss';

export default ({ loading, handeClick }: any) => {

  const classes = ['text-success', c.btn];

  return (
    <button type="button" className={classes.join(' ')} onClick={handeClick}>
      {
        loading ?
          <i className="bx bx-hourglass bx-spin me-2" /> :
          <i className="bx bx-down-arrow-alt me-2" />
      }
      Load more
    </button>
  );
}
