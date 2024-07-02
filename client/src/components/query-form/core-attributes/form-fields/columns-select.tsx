import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function ColumnsSelect({
  columns,
  avaibleColumns,
  updateStateFn,
}: {
  columns: string[];
  avaibleColumns: {key: string, label: string}[];
  updateStateFn: (columns: string[]) => void;
}) {
  const onValueChange = (event: SelectChangeEvent<typeof columns>) => {
    const {
      target: { value },
    } = event;

    updateStateFn(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 160, maxWidth: 1000 }}
      size="medium"
      disabled={avaibleColumns.length === 0}
    >
      <InputLabel id="relative-tables">Colunas</InputLabel>
      <Select
        sx={{}}
        autoWidth={false}
        labelId="relative-tables-label"
        id="relative-tables"
        multiple
        value={columns}
        onChange={onValueChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {avaibleColumns &&
          avaibleColumns.length > 0 &&
          avaibleColumns.map(({ key, label }) => (
            <MenuItem key={label} value={key}>
              <Checkbox checked={columns.indexOf(key) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
