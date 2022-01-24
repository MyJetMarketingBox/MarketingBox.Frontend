import React, { useEffect } from "react";
import  "./loader.css"

const Loader = (props: any) => {

  return (
    <div className="lds-facebook-wrapper">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )

}

export default Loader;