import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export function ColumnAggregationSelect({
  aggregationColumnState,
  updateStateFn,
  selectedColumns,
  disabled
}: {
  aggregationColumnState: string;
  updateStateFn: (value: string) => void;
  selectedColumns: string[];
  disabled: boolean
}) {
  const onValueChange = (event: SelectChangeEvent) => {
    updateStateFn(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} size="medium" disabled={disabled}>
      <InputLabel id="aggregation-column">Coluna da Agregação</InputLabel>
      <Select
        labelId="aggregation-column-label"
        id="aggregation-column"
        value={aggregationColumnState}
        label="Coluna da Agregação"
        onChange={onValueChange}
      >
        {selectedColumns.map((columnName) => (
          <MenuItem value={columnName} key={columnName}>{columnName.toUpperCase()}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
