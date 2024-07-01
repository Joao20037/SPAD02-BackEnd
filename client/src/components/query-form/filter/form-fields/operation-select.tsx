import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
  } from "@mui/material";
  
  export function FilterOperationSelect({
    filterState,
    updateStateFn,
    disabled
  }: {
    filterState: string;
    updateStateFn: (value: string) => void;
    disabled: boolean
  }) {
    const onValueChange = (event: SelectChangeEvent) => {
      updateStateFn(event.target.value);
    };
  
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" disabled={disabled}>
        <InputLabel id="filter">Operação do Filtro</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filterState}
          label="Operação do Filtro"
          onChange={onValueChange}
        >
          <MenuItem key="gt" value="gt">Maior</MenuItem>
          <MenuItem key="gte" value="gte">Maior ou igual</MenuItem>
          <MenuItem key="lt" value="lt">Menor</MenuItem>
          <MenuItem key="lte" value="lte">Menor ou igual</MenuItem>
          <MenuItem key="equal" value="equal">Igual</MenuItem>
        </Select>
      </FormControl>
    );
  }
  