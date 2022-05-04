import React from "react";
import { layoutThemeEnum } from "src/enums/LayoutsEnum";

//import components
import SidebarContent from "./SidebarContent";


const Sidebar = () => {
  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
