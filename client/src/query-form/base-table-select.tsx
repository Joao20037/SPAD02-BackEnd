import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export function BaseTableSelect({ baseTableState, updateStateFn }: {baseTableState: string, updateStateFn: (value: string) => void}) {
  const onValueChange = (event: SelectChangeEvent) => {
    updateStateFn(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
      <InputLabel id="base-table">Tabela Base</InputLabel>
      <Select
        labelId="base-table-label"
        id="base-table"
        value={baseTableState}
        label="Tabela Base"
        onChange={onValueChange}
      >
        <MenuItem value={"profile"}>Profile</MenuItem>
        <MenuItem value={"company"}>Company</MenuItem>
        <MenuItem value={"job"}>Job</MenuItem>
      </Select>
    </FormControl>
  );
}
