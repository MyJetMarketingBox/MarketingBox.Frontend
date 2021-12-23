import axios from "axios";

interface DashboardProps {
    id : number;
    title : string;
    price : number;
    rank : string;
    isDoller : boolean;
    postFix : string;
    statusColor : string;
    series : Array<any>;
}


const config = {
    method: 'get',
    //url: 'https://mb-affiliate-api.mnftx.biz/api/reports/by-days',
    //url: 'https://mb-affiliate-api.mnftx.biz/api/reports?fromDate=2021-11-01&toDate=2021-12-01',
    url: 'https://mb-affiliate-api.mnftx.biz/api/affiliates',
    headers: {
        'accept': 'text/plain',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtYXJrZXRpbmctYm94LWFmZmlsaWF0ZSIsInVzZXItbmFtZSI6IkdlbmVyYWxVc2VyIiwidGVuYW50LWlkIjoiZGVmYXVsdC10ZW5hbnQtaWQiLCJyb2xlIjoiQWRtaW4iLCJ1c2VyLWlkIjoiR2VuZXJhbE1hbmFnZXIiLCJuYmYiOjE2NDAwODAyMzMsImV4cCI6MTY0MDIwOTgzMywiaWF0IjoxNjQwMDgwMjMzfQ.DwH8zQ7ktZJED8umb4wHY2GLJS12CessOsaXsQCneDQ'
    }
};

// @ts-ignore
// function byDay(obj){
//     // @ts-ignore
//     let ctr = obj.map(item => item.registrationsCount);
//     // @ts-ignore
//     let ftd = obj.map(item => item.ftdCount);
//
//     return { 'ctr': ctr, 'ftd': ftd };
// }

// @ts-ignore
axios(config)
  .then(function (response) {
      console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
      console.log(error);
  });

//console.log(res);


const WidgetsData : Array<DashboardProps> = [
    {
        id: 1,
        title: "Clicks",
        price: 3,
        rank: "100%",
        isDoller: false,
        postFix: "",
        statusColor: "success",
        series: [0, 0, 0, 0, 3, 0, 0],
    },
    {
        id: 2,
        title: "Conversion",
        price: 2,
        rank: "100%",
        isDoller: false,
        postFix: "",
        statusColor: "success",
        series: [0, 0, 0, 0, 0, 0, 2]
    },
    {
        id: 3,
        title: "CR",
        price: 66.67,
        rank: "100%",
        isDoller: false,
        postFix: "%",
        statusColor: "success",
        series: [12, 15, 15, 6.67, 12, 2, 4]
    },
    {
        id: 5,
        title: "Payments",
        price: 1172,
        rank: "100%",
        isDoller: true,
        postFix: "$",
        statusColor: "success",
        series: [200, 250, 200, 250, 50, 50, 72]
    },
];

export { WidgetsData };