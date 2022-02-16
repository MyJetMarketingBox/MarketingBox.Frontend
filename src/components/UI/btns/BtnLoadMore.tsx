import React from "react";
import c from './BtnLoadMore.module.scss';

export default (props: any) => {

  const classes = ['text-success', c.btn];

  return (
    <button type="button" className={classes.join(' ')}>
      <i className="bx bx-hourglass bx-spin me-2" />
      Load more
    </button>
  );
}
