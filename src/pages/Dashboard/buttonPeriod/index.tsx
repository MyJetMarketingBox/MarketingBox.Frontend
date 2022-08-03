import React, { useState } from "react";
import c from "./buttonPeriod.module.scss";
import { PeriodName } from "../../../common/utils/model";

interface Props {
  setPeriod: (...args: any) => void
}

export default ( {setPeriod} : Props) => {

  const [active, setActive] = useState<any>(7);

  const click = (e: any) => {
    e.preventDefault();
    setActive(e.target.value);
    setPeriod(e.target.value)
  }

  return (
    <div className={`text-end `+c['btn-period-position']}>
      <div>
        { PeriodName.map(( item: any, idx: any) => {
            return  <button type="button" className={`btn btn-sm mr-5 ${+active === item.value ? "btnOrange" : "btn-dark"}`} key={item.value} value={item.value} onClick={click}> {item.label} </button>
          }
        )}
      </div>
    </div>
  )
}