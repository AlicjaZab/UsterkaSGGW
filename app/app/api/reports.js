import client from "./client";

const endpoint = "/reports";

const getReportsList = () => client.get(endpoint);

const postReport = (report) => client.post(endpoint, report);

const getReport = (id) => client.get(endpoint + "/" + id);

export default {
  getReportsList,
  getReport,
  postReport,
};
