import BootstrapTable from "react-bootstrap-table-next";
import ColumnActions from "../columnActions/ColumnActions";
import { AffiliateRole } from "../../../../common/utils/model";
import { useEffect, useRef } from "react";

export default ({ affiliates = [] }: any) => {
  // @ts-ignore
  const affiliateData = affiliates.map(affiliate => {
    let color, status;
    switch (affiliate.generalInfo.state) {
      case 0:
        status = "active";
        color = "success";
        break;
      case 2:
        status = "notActive";
        color = "warning";
        break;
      case 1:
        status = "banned";
        color = "danger";
        break;
      default:
        color = "light";
        break;
    }

    return {
      id: affiliate.affiliateId,
      username: affiliate.generalInfo.username,
      role: AffiliateRole[affiliate.generalInfo.role],
      ai: affiliate.affiliateId,
      email: affiliate.generalInfo.email,
      reportto: "Management",
      createdat: new Date(affiliate.generalInfo.createdAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }),
      status: status,
      actions: "",
      color: color
    };
  });

  const columns = [
    {
      dataField: "actions",
      text: "Actions",
      sort: false,
      formatter: (cell: any, row: any) => (
        <ColumnActions
          id={row.id}
        />
      )
    },
    {
      dataField: "username",
      text: "Username",
      sort: true
    },
    {
      dataField: "role",
      text: "Role",
      sort: true
    },
    {
      dataField: "ai",
      text: "AI",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
    },
    {
      dataField: "reportto",
      text: "Report To",
      sort: true
    },
    {
      dataField: "createdat",
      text: "Created At",
      sort: true
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent: any, productData: any) => (
        <>
          <div
            className={"badge badge-soft-" + productData.color + " font-size-12"}
          >
            {productData.status}
          </div>
        </>
      )
    }
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  return (
    <div>
      <BootstrapTable
        keyField='ai'
        data={affiliateData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap"}
        headerWrapperClasses={"thead-light"}
      />
    </div>
  );
}
