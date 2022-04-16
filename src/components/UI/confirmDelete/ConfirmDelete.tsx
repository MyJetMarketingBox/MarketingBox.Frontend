import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import c from './ConfirmDelete.module.scss';
import { AvField, AvForm } from "availity-reactstrap-validation";

export default ({ close, handleDelete }: any) => {
  const [value, setValue] = useState("");
  const [canDelete, setCanDelete] = useState(false);
  const { theme } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode
    }
  })

  const handleChange = (e: { target: { value: string } }) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    setCanDelete(value.toLowerCase() === 'delete');
  }, [value])

  const handleBtnDelete = () => {
    if (canDelete) {
      handleDelete();
      close();
    }
  }

  const classesContainer = [c['popup']];
  if (theme === 'dark') classesContainer.push(c['dark'])

  return ReactDOM.createPortal(
    <div className={classesContainer.join(' ')} onClick={close}>
      <div className={c["popup-wrapper"]} onClick={e => e.stopPropagation()}>

        <div className={c['popup-content']}>
          <div className={c['popup-btn-close']} onClick={close} />


          <div className={c['popup-img']}>
            <img src="/images/trashBin.png" alt="i" />
          </div>
          <div className={c['popup-title']}>
            Permanently Delete
          </div>
          <div className={c['popup-text']}>
            You are about to permanently delete content<br/>
            You will not be able to recover these contents.
          </div>
          <div className={c['popup-descr']}>
            *This operation cannot be undone
          </div>
          <div className={c['popup-input']}>
            <AvForm className="needs-validation">
              <AvField
                name="confirm"
                type="text"
                autoComplete="off"
                placeholder="Type DELETE to confirm"
                value={value.toUpperCase()}
                onChange={handleChange}
              />
            </AvForm>
          </div>
          <div className={c['popup-btns']}>
            <button type="button" className="btn custom-btn-light" onClick={close}>
              Cancel
            </button>
            <button
              type="button"
              className="btn custom-btn-success"
              onClick={handleBtnDelete}
              disabled={!canDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
