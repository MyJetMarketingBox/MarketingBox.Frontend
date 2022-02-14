import BootstrapTable from "react-bootstrap-table-next";
import React, { useState } from "react";
import { eventType, httpQueryType } from "../../../../common/utils/model";


export default ({logs = [], setID, toggle} : any) => {
  //console.log(logs);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "affiliate",
      text: "Affiliate",
      sort: true,
    },
    {
      dataField: "registrationUId",
      text: "Unique ID",
      sort: true,
    },
    {
      dataField: "eventType",
      text: "Event",
      sort: true,
    },
    {
      dataField: "httpQueryType",
      text: "Method",
      sort: true,
    },
    {
      dataField: "postbackReference",
      text: "URL",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
    }
  ];

  const defaultSorted: any = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const tableRowEvents = {
    onClick: (e:any, row:any, rowIndex:any) => {
      if(e.target.classList.length == 0) {
        setID(rowIndex);
        toggle();
      }
    }
  }

  /*
  "
    "postbackReference": "http://google.com/search?q=SomeParameter",
    "requestBody": null,
    "postbackResponse": "{\"Version\":\"1.1\",\"Content\":{\"Headers\":[{\"Key\":\"Content-Type\",\"Value\":[\"text/html; charset=ISO-8859-1\"]},{\"Key\":\"Expires\",\"Value\":[\"-1\"]}]},\"StatusCode\":200,\"ReasonPhrase\":\"OK\",\"Headers\":[{\"Key\":\"Date\",\"Value\":[\"Fri, 04 Feb 2022 17:17:40 GMT\"]},{\"Key\":\"Cache-Control\",\"Value\":[\"max-age=0, private\"]},{\"Key\":\"P3P\",\"Value\":[\"CP=\\\"This is not a P3P policy! See g.co/p3phelp for more info.\\\"\"]},{\"Key\":\"Server\",\"Value\":[\"gws\"]},{\"Key\":\"X-XSS-Protection\",\"Value\":[\"0\"]},{\"Key\":\"X-Frame-Options\",\"Value\":[\"SAMEORIGIN\"]},{\"Key\":\"Set-Cookie\",\"Value\":[\"1P_JAR=2022-02-04-17; expires=Sun, 06-Mar-2022 17:17:40 GMT; path=/; domain=.google.com; Secure\",\"NID=511=SwdlPBSz_kGLWQca_imT07DW8FsidfwizRxzEtK3vMwLWqV999evRRyKuCgP7WVZfn74VKeiUqNZx3XtLdA4afzzXLfWbutc0DRYf6Gzzcnf1Eu9i4UEZqKBk6gJRzhmEjsL4zjHrt0vjR122bZEQZKwrhRm3Q8gIrEZO2YuJHQ; expires=Sat, 06-Aug-2022 17:17:39 GMT; path=/; domain=.google.com; HttpOnly\"]},{\"Key\":\"Accept-Ranges\",\"Value\":[\"none\"]},{\"Key\":\"Vary\",\"Value\":[\"Accept-Encoding\"]},{\"Key\":\"Transfer-Encoding\",\"Value\":[\"chunked\"]}],\"TrailingHeaders\":[],\"RequestMessage\":{\"Version\":\"1.1\",\"VersionPolicy\":0,\"Content\":null,\"Method\":{\"Method\":\"GET\"},\"RequestUri\":\"http://www.google.com/search?q=SomeParameter\",\"Headers\":[],\"Properties\":{},\"Options\":{}},\"IsSuccessStatusCode\":true}",
    "eventMessage": "{\"TenantId\":\"default-tenant-id\",\"GeneralInfo\":{\"FirstName\":\"Lev-Test\",\"LastName\":\"Test\",\"Password\":\"Trader123\",\"Email\":\"lev_test@mailinator.com\",\"Phone\":\"+48555375000\",\"Ip\":\"99.99.99.99\",\"Country\":\"UA\",\"RegistrationId\":991,\"UniqueId\":\"53f9224ed2ef47e5a0737fcc8216c289\",\"CreatedAt\":\"2022-02-04T17:06:01.1212899\",\"UpdatedAt\":\"2022-02-04T17:07:44.2346449\",\"RegistrationUId\":\"53f9224ed2ef47e5a0737fcc8216c289\"},\"RouteInfo\":{\"AffiliateId\":14,\"CampaignId\":41,\"BrandId\":3,\"Integration\":\"Handelpro\",\"IntegrationId\":3,\"Status\":1,\"CrmCrmStatus\":null,\"DepositDate\":null,\"ConversionDate\":null,\"CustomerInfo\":{\"CustomerId\":\"1df003b00c9843fe934042779aad086b\",\"Token\":\"059CA9656250DB2E8946581261D207F885DBA56782A03991E6840F9A7C4C52028C55D6A09D67021B1CC98B725AB5010B0B62E869D69B29ED84E3E1CFDD0B420E\",\"LoginUrl\":\"https://trading-test.handelpro.biz/lpLogin/059CA9656250DB2E8946581261D207F885DBA56782A03991E6840F9A7C4C52028C55D6A09D67021B1CC98B725AB5010B0B62E869D69B29ED84E3E1CFDD0B420E?lang=UK\",\"Brand\":null},\"UpdateMode\":0,\"CrmStatus\":0,\"AffiliateName\":\"Sveta_Test_Affiliate_2112\"},\"AdditionalInfo\":{\"So\":null,\"Sub\":null,\"Sub1\":\"SomeParameter\",\"Sub2\":null,\"Sub3\":null,\"Sub4\":null,\"Sub5\":null,\"Sub6\":null,\"Sub7\":null,\"Sub8\":null,\"Sub9\":null,\"Sub10\":null,\"Funnel\":null,\"AffCode\":null},\"Sequence\":1}",
    "responseStatus": 0,
    "date": "2022-02-04T17:18:10.10397"
    */

  const logsData = logs.map((item: any) => {
    return {
      affiliate: item.affiliateId,
      registrationUId: item.registrationUId,
      eventType: eventType[item.eventType],
      httpQueryType: httpQueryType[item.httpQueryType].toUpperCase(),
      postbackReference: item.postbackReference,
      createdAt: new Date(item.date).toLocaleDateString('ru-RU', {day:"2-digit", month:"2-digit", year:"2-digit", hour: "2-digit", minute: "2-digit", second: "numeric"}),
    }
  });

  return (
    <>
      <BootstrapTable
        keyField='registrationUId'
        data={logsData}
        columns={columns}
        bordered={false}
        striped={false}
        defaultSorted={defaultSorted}
        classes={"table align-middle table-nowrap"}
        headerWrapperClasses={"thead-light"}
        rowEvents={tableRowEvents}
      />
    </>
  )

}