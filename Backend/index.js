import express from "express";
import readline from "readline";
import multer from "multer";
import fs from "fs"
import cors from "cors"
const app = express();
const PORT = 3000;


app.use(cors())


app.post("/upload", (req, res) => {



  const rl = readline.createInterface({ input: req });

  let totalRequests = 0;
  let statusCodes = {};
  let routes = {}
  let suspiciousIPs = [];

  rl.on("line", (line) => {
    totalRequests++;
    const parts = line.split(" ");
    const ip = parts[0];
    const route = parts[6]
    const status = parts[parts.length - 2]; 

    statusCodes[status] = (statusCodes[status] || 0) + 1;

    if (status === "401" || status === "403") {
      suspiciousIPs.push(ip);
    }
    if (route) {
      routes[route] = (routes[route] || 0) + 1;
    }
  });

rl.on("close", () => {
  

   const topRoutes = Object.entries(routes)
      .sort((a, b) => b[1] - a[1]) // highest first
      .slice(0, 5)
      .map(([route, count]) => ({ route, count }));

  res.json({
    totalRequests,
    statusCodes,
    suspiciousIPs: [...new Set(suspiciousIPs)],
    topRoutes
  });
});
})

app.listen(PORT, () => {
  console.log(`Your server is running on PORT : ${PORT}`);
});
