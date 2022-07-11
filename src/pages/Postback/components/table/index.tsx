import BootstrapTable from "react-bootstrap-table-next";
import ConfirmDelete from "../../../../components/UI/confirmDelete/ConfirmDelete";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Page from "../../../../constants/pages";
import { delPostback } from "../../../../store/postback/actions";
import ColumnActions from "../../../../components/UI/columnActions/ColumnActions";
import { httpQueryType } from "../../../../common/utils/model";


export default ({postbacks = [], setPostbackId, toggle, selected} : any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState(false);


  const postbackData = postbacks.map((item: any) => {
    let events: string;
    events = (item.depositReference || item
      .depositTGReference) ? "FTDs" : "";
    events += (events) ? ", " : "";
    events += (item.registrationReference || item
      .registrationTGReference) ? "Lead" : "";

    return {
      id: item.id,
      affiliateId: item.affiliateId,
      affiliateName: item.affiliateName,
      method: httpQueryType[item.httpQueryType],
      events: events
    }
  });

  const listActions: any = [
    {
      label: "edit",
      handler: (id: number) => {
        toggle(true);
        setPostbackId(+id);
      },
    },
    {
      label: "delete",
      handler: (id: any) => {
        setIsOpen(true);
        setSelectId(id);
      },
    },
  ];

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions id={row.id} items={listActions} />
      ),
    },
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "affiliateId",
      text: "Affiliate ID",
      sort: true,
    },
    {
      dataField: "affiliateName",
      text: "Affiliate Name",
      sort: false,
    },
    {
      dataField: "method",
      text: "Method",
      sort: false,
    },
    {
      dataField: "events",
      text: "Events",
      sort: false,
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const toggleDelete = () => {
    setIsOpen(prev => !prev);
  };

  const toggleAction = (status: boolean) => {
    console.log(status);
  }


  const handleDeletePostback = (id: number) => {
    dispatch(delPostback(id))
  }

  let tableRowEvents;
  tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: any) => {
      if (e.target.classList.length == 0) {
        setPostbackId(row.id);
        toggle(true);
      }
    },
  };


  return (
    <>
      <BootstrapTable
        keyField='id'
        data={postbackData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap"}
        headerWrapperClasses={"thead-light"}
        rowEvents={tableRowEvents}
      />

      {isOpen && <ConfirmDelete
        isOpen={isOpen}
        toggle={toggleDelete}
        handleDelete={handleDeletePostback}
        id={selectId}
      />}


    </>
  );

}