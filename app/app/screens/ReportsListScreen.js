import React, { useEffect, useState } from "react";
import reportsApi from "../api/reports";

function ReportsListScreen(props) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const response = await reportsApi.getReportsList();
    setReports(response.data);
  };

  return <div></div>;
}

export default ReportsListScreen;
