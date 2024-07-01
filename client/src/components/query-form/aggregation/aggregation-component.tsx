import { Box, Stack } from "@mui/material";
import { AggregationSelect } from "./form-fields/agregation-select";
import { ColumnAggregationSelect } from "./form-fields/column-aggregation-select";

export function AggregationComponent({
  selectedColumns,
  aggregationState,
  aggregationColumnState,
  setAggregation,
  setAggregationColumn,
}: {
  selectedColumns: string[];
  aggregationState: string;
  aggregationColumnState: string;
  setAggregation: (value: string) => void;
  setAggregationColumn: (value: string) => void;
}) {
  return (
    <Box component="section">
      <h2>Agregação</h2>
      <Stack direction="row">
        <AggregationSelect
          disabled={selectedColumns.length === 0}
          aggregationState={aggregationState}
          updateStateFn={setAggregation}
        />

        <ColumnAggregationSelect
          aggregationColumnState={aggregationColumnState}
          updateStateFn={setAggregationColumn}
          selectedColumns={selectedColumns}
          disabled={selectedColumns.length === 0 && aggregationState === ""}
        />
      </Stack>
    </Box>
  );
}
