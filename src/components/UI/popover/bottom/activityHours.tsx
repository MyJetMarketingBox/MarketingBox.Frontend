import React, { useEffect, useRef, useState } from "react";
import { Label, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import c from "./activityHours.module.scss";
import { DayOfWeek } from "../../../../common/utils/model";
import { ActivityHoursType } from "src/types/ActivityHoursType";

interface Props {
  id: number | string;
  activityHours: ActivityHoursType[];
}

export default ({ id, activityHours }: Props) => {
  const [popoverBottom, setPopoverBottom] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleTogglePopover = () => {
    setPopoverBottom(prev => !prev);
  };

  const handleClickOutside = (e: any) => {
    if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
      setPopoverBottom(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  return (
    <div ref={wrapperRef}>
      <a
        id={"popoverBottom" + id}
        onClick={handleTogglePopover}
        color="secondary"
        key={id}
        className="text-orange"
      >
        {!popoverBottom ? "Show" : "Hide"}
      </a>
      <Popover
        placement="bottom"
        isOpen={popoverBottom}
        target={"popoverBottom" + id}
        toggle={handleTogglePopover}
      >
        <PopoverHeader>Activity Hours</PopoverHeader>
        <PopoverBody>
          <ul className={c["ul"]}>
            {activityHours?.map(item => (
              <li key={item.day} className={c["list-hours"]}>
                <Label className={c["day"]}>{DayOfWeek[item.day]}</Label>
                <Label className={"mr-5"}>{item?.from.slice(0, 5)}</Label>-
                <Label className={"ml-5"}>{item?.to.slice(0, 5)}</Label>
              </li>
            ))}
          </ul>
        </PopoverBody>
      </Popover>
    </div>
  );
};
