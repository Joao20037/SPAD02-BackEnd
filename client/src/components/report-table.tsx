import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
  TableBody,
  Box
} from "@mui/material";
// import React, { useEffect } from "react";

export function ReportTable({
  headers,
  content,
}: {
  headers: string[];
  content: Record<string, string>[];
}) {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [dataPerPage, setDataPerPage] = useState(JSON.parse(JSON.stringify(content)).slice(0, rowsPerPage));

  // useEffect(() => {
  //   setPage(0);
  //   setRowsPerPage(10);
  // }, [content])

  return (
    <Box component="section">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Ad Hoc">
          <TableHead>
            <TableRow>
              {headers.map((title) => (
                <TableCell>{title.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {content.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.keys(row).map((key, index) => (
                    <TableCell key={index}>{row[key] ?? "---"}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        count={content.length}
        rowsPerPageOptions={[10, 50, 100, 500]}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        onPageChange={(e: unknown, newPage: number) => {
          setPage(newPage);
          setDataPerPage(JSON.parse(JSON.stringify(content)).slice(page * rowsPerPage, page === 0 ? rowsPerPage : page * rowsPerPage))
        }}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
          setDataPerPage(JSON.parse(JSON.stringify(content)).slice(page * rowsPerPage, page === 0 ? rowsPerPage : page * rowsPerPage))
        }}
      /> */}
    </Box>
  );
}
