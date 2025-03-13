const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports/cucumber-reports",
  reportPath: "./reports/Multiple_Cucumber_Reports",
  reportName: "GQE Playwright API Automation report",
  pageTitle: "ReqRes API Test Autmation report",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "10",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Basic Demo project" },
      { label: "Release", value: "0.1.0" },
      { label: "Cycle", value: "Smoke-1" },
      { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});