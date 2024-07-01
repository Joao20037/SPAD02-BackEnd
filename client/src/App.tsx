import { QueryForm } from "./components/query-form";
import { ReportTable } from "./components/report-table";
import { ADHOC_MOCK } from "./mock";

function App() {
  return (
    <>
      <QueryForm />
      <ReportTable content={ADHOC_MOCK.tableContent.rows} headers={ADHOC_MOCK.tableContent.headers}/>
    </>
  );
}

export default App;
