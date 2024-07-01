import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export function FilterColumnSelect({
  filterColumnState,
  updateStateFn,
  selectedColumns,
  disabled
}: {
  filterColumnState: string;
  updateStateFn: (value: string) => void;
  selectedColumns: string[];
  disabled: boolean
}) {
  const onValueChange = (event: SelectChangeEvent) => {
    updateStateFn(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" disabled={disabled}>
      <InputLabel id="filter-column">Aplicar filtro em</InputLabel>
      <Select
        labelId="filter-column-label"
        id="filter-column"
        value={filterColumnState}
        label="Coluna do filtro"
        onChange={onValueChange}
      >
        {selectedColumns.map((columnName) => (
          <MenuItem value={columnName} key={columnName}>{columnName.toUpperCase()}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
