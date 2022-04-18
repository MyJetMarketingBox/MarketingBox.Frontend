import React from "react";

import c from "./LightDark.module.scss";

//Import Icons
import Icon from "@ailibs/feather-react-ts";

//constants
import { layoutTheme } from "../../../constants/layout";

interface LightDarkState {
  layoutMode: string;
  onChangeLayoutMode: any;
}

const LightDark = ({ layoutMode, onChangeLayoutMode }: LightDarkState) => {
  const mode =
    layoutMode === layoutTheme["DARKMODE"]
      ? layoutTheme["LIGHTMODE"]
      : layoutTheme["DARKMODE"];

  const classes = [c.btnWrapper];
  if (layoutMode === layoutTheme["DARKMODE"]) {
    classes.push(c.dark);
  }

  return (
    <div className={classes.join(" ")}>
      <button
        onClick={() => onChangeLayoutMode(mode)}
        type="button"
        className={c.btn}
      >
        <span className={c.iconDark}>
          <Icon name="moon" className="icon-sm" />
        </span>
        <span className={c.iconLight}>
          <Icon name="sun" className="icon-sm" />
        </span>
        <span className={c.circle} />
      </button>
    </div>
  );
};

export default LightDark;
