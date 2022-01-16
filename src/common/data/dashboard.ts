import axios from "axios";
import accessToken from "./../../helpers/jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken
const fromDate = new Date(new Date().setDate(new Date().getDate() - 7)).toJSON().slice(0, 10);
const toDate = new Date().toJSON().slice(0, 10);

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


const MyState = {
    ctr: [],
    ftd: []
};

async function getData(){

    let response = await fetch(`https://mb-affiliate-api.mnftx.biz/api/reports?fromDate=${fromDate}&toDate=${toDate}`, {
        method: 'get',
        headers: {
            'accept': 'text/plain',
            'Authorization': token
        }
    });
    let res = await response.json();
    console.log(res)

    // @ts-ignore
    let ctr = await res.items.map(item => item.registrationsCount);
    //MyState.ctr.push(res.items.map(item => item.registrationsCount));

    // @ts-ignore
    let ftd = await res.items.map(item => item.ftdCount);
    //MyState.ftd.push(res.items.map(item => item.ftdCount));

    return  {
        "ctr": ctr,
        "ftd": ftd
    };

}


const WidgetsData : Array<DashboardProps> = [
    {
        id: 1,
        title: "Clicks",
        price: 3,
        rank: "100%",
        isDoller: false,
        postFix: "",
        statusColor: "success",
        series: [0, 0, 0, 3, 0, 0, 2],
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