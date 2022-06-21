import React, { useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStatusLog } from "../../../../store/registrations/actions";
import BootstrapTable from "react-bootstrap-table-next";
import { RegistrationStatus } from "../../../../common/utils/model";

export default ({ regId }: any) => {
  const dispatch = useDispatch();

  const {status_log, loadedLog} = useSelector((state: any) => {
    return {
      status_log: state.Registrations.status_log,
      loadedLog: state.Registrations.loadedLog
    }
  })

  useEffect(() => {
    dispatch(getStatusLog({registrationId : regId}))
  }, [regId])

  const logData = status_log.map((item : any) => {
    return {
      id: item.id,
      userName: item.userName,
      oldStatus: RegistrationStatus[item.oldStatus],
      newStatus: RegistrationStatus[item.newStatus],
      comment: item.comment,
      date: new Date(item.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  });

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "userName",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "oldStatus",
      text: "Old Status",
    },
    {
      dataField: "newStatus",
      text: "New Status",
    },
    {
      dataField: "comment",
      text: "Comment",
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
    },
  ]

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <Card>
      <CardBody>
        {
          (loadedLog && logData.length)? <BootstrapTable
          keyField="id"
          data={logData}
          columns={columns}
          bordered={false}
          striped={false}
          defaultSorted={defaultSorted}
          classes={"table align-middle"}
          headerWrapperClasses={"thead-light"}
        /> : null}
        {
          (!logData.length && loadedLog) ?
            <div style={{ "textAlign": "center", "padding": "30px 0" }}>
              <h3>No Data Available</h3>
            </div> :
            null
        }
      </CardBody>
    </Card>
  )
}