import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function UploadLog() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file first!");
    const formData = new FormData();
    formData.append("logfile", file);

    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResult(res.data);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center"
      >
        📊 Log File Analyzer
      </motion.h2>

      {/* Upload Section */}
      <Card className="p-6 shadow-md">
        <CardContent className="flex items-center justify-between gap-4">
          <input
            type="file"
            accept=".log,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <Button onClick={handleUpload} className="bg-blue-600 text-white">
            Upload & Analyze
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Total Requests */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600">
                {result.totalRequests}
              </p>
            </CardContent>
          </Card>

          {/* Status Codes Chart */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Status Codes</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(result.statusCodes).map(
                      ([code, count]) => ({ code, count })
                    )}
                    dataKey="count"
                    nameKey="code"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {Object.entries(result.statusCodes).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Suspicious IPs */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Suspicious IPs 🚨</CardTitle>
            </CardHeader>
            <CardContent>
              {result.suspiciousIPs.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {result.suspiciousIPs.map((ip, idx) => (
                    <li key={idx} className="text-red-600 font-medium">
                      {ip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-600">No suspicious IPs found 🎉</p>
              )}
            </CardContent>
          </Card>

          {/* Top Routes Chart */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Top Routes 📈</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.topRoutes}>
                  <XAxis dataKey="route" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
