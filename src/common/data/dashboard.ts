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