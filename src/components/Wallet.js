// import "./wallet.css";
//import React from "react";

// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// const userCoins = [
//   { name: "Cardano", value: 400 },
//   { name: "Ethereum", value: 750 },
//   { name: "Bitcoin", value: 800 },
//   { name: "Polygon", value: 200 },
//   { name: "Dogecoin", value: 300 },
//   { name: "Solana", value: 1500 },
// ];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// export default function App() {
//   const handleClick = () => {
//     console.log("click");
//   };
//   return (
//     <div className="pieChart-container">
//       <ResponsiveContainer width="100%" aspect={"50%"}>
//         <PieChart className="pie-chart">
//           <Pie
//             data={userCoins}
//             // cx="50%" //! or can be set {200} // not sure what this is exactly
//             // cy="75%" //! or can be set {200}
//             innerRadius={40}
//             outerRadius={80}
//             fill="#8884d8"
//             paddingAngle={5}
//             dataKey="value" //! not sure what this is exactly
//             label
//           >
//             {userCoins.map((entry, index) => (
//               <Cell
//                 onMouseEnter={handleClick}
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// import "./styles.css";
// import React, { useState, useEffect } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export default function Wallet() {
//   //   const [dimensions, setDimensions] = React.useState({
//   //     height: window.innerHeight,
//   //     width: window.innerWidth,
//   //   });
//   //   React.useEffect(() => {
//   //     function handleResize() {
//   //       setDimensions({
//   //         height: window.innerHeight,
//   //         width: window.innerWidth,
//   //       });
//   //     }

//   //     window.addEventListener("resize", handleResize);

//   //     return (_) => {
//   //       window.removeEventListener("resize", handleResize);
//   //     };
//   //   });

//   const Chart = () => {
//     return (
//       <ResponsiveContainer /*width={100} height={50}*/>
//         <AreaChart
//           width={500}
//           height={1000}
//           data={data}
//           margin={{
//             top: 5,
//             right: 5,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Area
//             // isAnimationActive={false}
//             type="monotone"
//             dataKey="uv"
//             stroke="#8884d8"
//             fill="#8884d8"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     );
//   };

//   return (
//     <div
//       className="recharts-wrapper"
//       style={{ width: "1000px", height: "500px", border: "red 1px solid" }}
//     >
//       <Chart />
//       {/* <ResponsiveContainer>
//         <AreaChart
//           data={data}
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
//         </AreaChart>
//       </ResponsiveContainer> */}
//     </div>
//   );
// }

import React from "react";

export default function Wallet() {
  return <div>Wallet</div>;
}
