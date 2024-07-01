import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
  TableBody,
} from "@mui/material";

export function ReportTable({
  headers,
  content,
}: {
  headers: string[];
  content: Record<string, string>[];
}) {
  let rowsKey = 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((title) => (
              <TableCell>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => {
            rowsKey++;

            return (
              <TableRow
                key={rowsKey}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((key) => (
                  <TableCell align="right" key={row[key]}>
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}