import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { RedistributionFrequency, RedistributionState } from "../../../../common/utils/model";
import { TableButtonHandlerEnum } from "../../../../enums/TableButtonHandlerEnum";
import { RedistributionStatusEnum } from "../../../../enums/RedistributionStatusEnum";
import ChangeStatus from "../../../../components/UI/modal/changeStatus/changeStatusRedistribution";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";

const tableIndex = ({data = []} : any) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState<number>();
  const [selectStatus, setSelectStatus] = useState<RedistributionStatusEnum>(RedistributionStatusEnum.Disable);

  const toggleAction = () => {
    setIsOpen(prev => !prev);
  };

  const listActions: any = [
    {
      label: "change status",
      type: TableButtonHandlerEnum.EditStatus,
      handler: (id : number, status: RedistributionStatusEnum) => {
        setIsOpen(true);
        setSelectId(+id);
        setSelectStatus(status)
      },
    },
  ];

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort:false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.id} items={listActions} data={{ status: +row.statusId }}/>
      )
    },
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "redistributionName",
      text: "Name",
      sort: true,
    },
    {
      dataField: "createdByUserName",
      text: "Created by user",
      sort: true,
      formatter: (cellContent: any, data: any) => (
        <>
          {/*<i className="bx bx-info-circle text-muted"></i>{" "}*/}
          {data.createdByUserName}
        </>
      ),
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
    },
    {
      dataField: "destination",
      text: "Destination",
      sort: false,
    },
    {
      dataField: "frequency",
      text: "Frequency",
      sort: false,
    },
    {
      dataField: "dayLimit",
      text: "Day limit",
      sort: false,
    },
    {
      dataField: "portionLimit",
      text: "Portion limit",
      sort: false,
    },
    {
      dataField: "status",
      text: "Status",
      sort: false,
      formatter: (cellContent: any, data: any) => (
        <>
          <div
            className={
              "badge badge-soft-" + data.color + " font-size-12"
            }
          >
            {data.status}
          </div>
        </>
      ),
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const resList = data.map((item: any) => {

    let color;
    switch (item.status) {
      case 0:
        color = "dark-blue";
        break;
      case 1:
        color = "success";
        break;
      case 2:
        color = "fx-orange";
        break;
      case 3:
        color = "danger";
        break;
      default:
        color = "light";
        break;
    }

    return {
      id: item.id,
      redistributionName: item.redistributionName,
      createdByUserName: item.createdByUserName,
      createdAt: new Date(item.createdAt).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit"}),
      destination: "Affiliate: "+item.affiliateId+". Campaign: "+item.campaignId+". ",
      status: RedistributionState[item.status],
      statusId: item.status,
      frequency: RedistributionFrequency[item.frequency],
      portionLimit: item.portionLimit,
      dayLimit: item.dayLimit,
      color: color,
    }
  })

  return (
    <>
      <BootstrapTable
        keyField='id'
        data={resList}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap table-hover"}
        headerWrapperClasses={"thead-light"}
      />

      {selectId &&
        <ChangeStatus
          isOpen={isOpen}
          toggle={toggleAction}
          id={selectId}
          status={selectStatus}
        />
      }
    </>
  )
}

export default tableIndex;