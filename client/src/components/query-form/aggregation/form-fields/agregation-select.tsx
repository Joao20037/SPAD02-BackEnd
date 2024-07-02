import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export function AggregationSelect({
  disabled,
  aggregationState,
  updateStateFn,
}: {
  disabled: boolean;
  aggregationState: string;
  updateStateFn: (value: string) => void;
}) {
  const onValueChange = (event: SelectChangeEvent) => {
    updateStateFn(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" disabled={disabled}>
      <InputLabel id="aggregation">Agregação</InputLabel>
      <Select
        labelId="aggregation-label"
        id="aggregation"
        value={aggregationState}
        label="Agregação"
        onChange={onValueChange}
      >
        <MenuItem value={""}></MenuItem>
        <MenuItem value={"sum"}>Sum</MenuItem>
        <MenuItem value={"avg"}>Avg</MenuItem>
        <MenuItem value={"min"}>Min</MenuItem>
        <MenuItem value={"max"}>Max</MenuItem>
        <MenuItem value={"count"}>Count</MenuItem>
      </Select>
    </FormControl>
  );
}
