import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Function to export data as CSV
export function exportToCSV(data) {
  const csvRows = [];
  const headers = Object.keys(data).filter((key) => key !== "chartData" && key !== "paymentMethods");
  csvRows.push(headers.join(","));

  const values = headers.map((header) => data[header]);
  csvRows.push(values.join(","));

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "revenue_data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to export data as PDF
export function exportToPDF(data) {
  const doc = new jsPDF();
  doc.text("Revenue Report", 20, 10);

  const tableData = [
    ["Total", data.total],
    ["Daily", data.daily],
    ["Weekly", data.weekly],
    ["Monthly", data.monthly],
  ];

  autoTable(doc, {
    head: [["Metric", "Amount"]],
    body: tableData,
    startY: 20,
  });

  doc.save("revenue_report.pdf");
}
