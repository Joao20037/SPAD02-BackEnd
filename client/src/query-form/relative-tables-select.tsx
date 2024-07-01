import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";

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

const tablesMap: Record<string, string[]> = {
    "initial": [],
    "profile": ["company"],
    "company": ["profile", "job"],
    "job": ["company"]
}

export function RelativeTablesSelect({ baseTable, relativeTablesState, updateStateFn }: { baseTable: string, relativeTablesState: string[], updateStateFn: (value: string[]) => void}) {
  const onValueChange = (event: SelectChangeEvent<typeof relativeTablesState>) => {
    const {target: {value}} = event;
    updateStateFn(
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" disabled={!baseTable}>
      <InputLabel id="relative-tables">Tabelas</InputLabel>
      <Select
        labelId="relative-tables-label"
        id="relative-tables"
        multiple
        value={relativeTablesState}
        onChange={onValueChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {baseTable && tablesMap[baseTable].map((tableName) => (
          <MenuItem key={tableName} value={tableName}>
            <Checkbox checked={relativeTablesState.indexOf(tableName) > -1} />
            <ListItemText primary={tableName[0].toUpperCase() + tableName.slice(1)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
