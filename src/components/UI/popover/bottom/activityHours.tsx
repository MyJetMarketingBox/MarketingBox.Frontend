import React, { useState } from "react";
import { Label, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import c from "./activityHours.module.scss"
import { DayOfWeek } from "../../../../common/utils/model";

export default ({id, activityHours} : any) => {
  const [popoverBottom, setPopoverBottom] = useState(false);

  return (
    <div>
      <a
        id={"popoverBottom"+id}
        onClick={() => {
          setPopoverBottom(!popoverBottom);
        }}
        color="secondary"
        key={id}
      >
        {(!popoverBottom)? "Show" : "Hide"}
      </a>
      <Popover
        placement="bottom"
        isOpen={popoverBottom}
        target={"popoverBottom"+id}
        toggle={() => {
          setPopoverBottom(!popoverBottom);
        }}
      >
        <PopoverHeader>Activity Hours</PopoverHeader>
        <PopoverBody>
          <ul className={c["ul"]}>
          {activityHours.map((item : any) => (
            <li className={c["list-hours"]}>
              <Label className={c["day"]}>{DayOfWeek[item.day]}</Label>
              <Label className={"mr-5"}>{item.from.slice(0, 5)}</Label>
              -
              <Label className={"ml-5"}>{item.to.slice(0, 5)}</Label>
            </li>
          ))}
          </ul>
        </PopoverBody>
      </Popover>
    </div>
  )
}