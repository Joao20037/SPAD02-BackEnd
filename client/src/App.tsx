import { useState } from "react";
import { QueryForm } from "./components/query-form/query-form";
import { ReportTable } from "./components/report-table";
import { IResponseWS } from "./web/interface";

function App() {
  const [tableContent, setTableContent] = useState<IResponseWS["tableContent"]>(
    { headers: [], rows: [] }
  );

  return (
    <>
      <QueryForm setTableContent={setTableContent} />
      <ReportTable content={tableContent.rows} headers={tableContent.headers} />
    </>
  );
}

export default App;
