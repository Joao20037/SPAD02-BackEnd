import { TextField } from "@mui/material";

export function FilterValueInput({
  valueState,
  updateStateFn,
  disabled
}: {
  valueState: string;
  updateStateFn: (value: string) => void;
  disabled: boolean
}) {
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStateFn(event.target.value);
  };

  return (
    <TextField
      id="filter-value"
      label="Valor"
      variant="outlined"
      sx={{ m: 1, minWidth: 120 }}
      value={valueState}
      onChange={onValueChange}
      disabled={disabled}
    />
  );
}
