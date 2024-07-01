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
  avaibleColumns,
  disabled,
}: {
  filterColumnState: string;
  updateStateFn: (value: string) => void;
  avaibleColumns: { key: string; label: string }[];
  disabled: boolean;
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
        {avaibleColumns.map((column) => (
          <MenuItem value={column.key} key={column.key}>
            {column.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
