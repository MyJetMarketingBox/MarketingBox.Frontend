import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import c from "./Info.module.scss";
import { changeRootBlur } from "../../../../store/layout/actions";
import parse from 'html-react-parser'
import logo from "../../../../assets/images/logo.svg";

export default ({ isOpen, toggle, content }: any) => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state: any) => {
    return {
      theme: state.Layout.layoutMode,
    };
  });

  useEffect(() => {
    dispatch(changeRootBlur(isOpen));
  }, [isOpen]);

  const close = () => {
    toggle(false);
  };

  const classesContainer = [c["popup"]];
  if (theme === "dark") classesContainer.push(c["dark"]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={classesContainer.join(" ")} onClick={close}>
      <div className={c["popup-wrapper"]} onClick={e => e.stopPropagation()}>
        <div className={c["popup-content"]}>
          <div className={c["popup-btn-close"]} onClick={close} />

          <div className={c["popup-img"]}>
            <img src={logo} alt="logo" width="312" height="80" />
          </div>

          <div className={c["popup-title"]}>{content.title}</div>

          <div className={c["popup-text"]} > {parse(content.text)} </div>

        </div>
      </div>
    </div>,
    document.body
  );
};
