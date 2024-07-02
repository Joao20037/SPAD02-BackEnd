import { Box } from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

export function ReportTable({
  headers,
  content,
}: {
  headers: { key: string; label: string }[];
  content: Record<string, string>[];
}) {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  

  return (
    <Box>
      <DataGrid
        checkboxSelection
        slots={{ toolbar: CustomToolbar }}
        rows={content.map((value, index) => {
          return {
            id: index,
            ...value,
          };
        })}
        columns={ headers.map((column) => {
          return { field: column.label, headerName: column.label, width: 150 };
        })}
      />
    </Box>
  );
}
