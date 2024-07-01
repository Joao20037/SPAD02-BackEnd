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

// (
//   <TableRow
//     key={row.name}
//     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//   >
//     <TableCell component="th" scope="row">
//       {row.name}
//     </TableCell>
//     <TableCell align="right">{row.calories}</TableCell>
//     <TableCell align="right">{row.fat}</TableCell>
//     <TableCell align="right">{row.carbs}</TableCell>
//     <TableCell align="right">{row.protein}</TableCell>
//   </TableRow>
// )
