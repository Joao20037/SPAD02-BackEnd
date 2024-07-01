import { Box, Stack } from "@mui/material";
import { BaseTableSelect } from "./form-fields/base-table-select";
import { RelativeTablesSelect } from "./form-fields/relative-tables-select";
import { ColumnsSelect } from "./form-fields/columns-select";

export function CoreAttributesComponent({
  baseTableState,
  relativesTablesState,
  columnsState,
  avaibleColumns,
  setBaseTable,
  setRelativesTables,
  setColumns,
}: {
  baseTableState: string;
  relativesTablesState: string[];
  columnsState: string[];
  avaibleColumns: { key: string; label: string }[];
  setBaseTable: (value: string) => void;
  setRelativesTables: (value: string[]) => void;
  setColumns: (value: string[]) => void;
}) {
  return (
    <Box component="section">
      <h2>Campos principais</h2>
      <Stack direction="row">
        <BaseTableSelect
          baseTableState={baseTableState}
          updateStateFn={setBaseTable}
        />
        <RelativeTablesSelect
          baseTable={baseTableState}
          relativeTablesState={relativesTablesState}
          updateStateFn={setRelativesTables}
        />

        <ColumnsSelect
          columns={columnsState}
          avaibleColumns={avaibleColumns}
          updateStateFn={setColumns}
        />
      </Stack>
    </Box>
  );
}
