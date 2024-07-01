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

const columnsMap: Record<string, string[]> = {
  profile: ["id", "first_name", "last_name", "full_name", "city", "state", "languages", "school", "company_id"],
  company: ["company_id", "name", "description", "company_size", "country", "state", "city", "zip_code", "adress", "url"],
  job: ["id", "job_id", "company_id", "title", "description", "location", "med_salary", "remote_allowed", "work_type", "application_url", "expiry"]
};

export function ColumnsSelect({
  columns,
  selectedTables,
  updateStateFn
}: {
  columns: string[]
  selectedTables: string[];
  updateStateFn: (columns: string[]) => void;
}) {
  const onValueChange = (event: SelectChangeEvent<typeof columns>) => {
    const {
      target: { value },
    } = event;

    updateStateFn(typeof value === "string" ? value.split(",") : value);
  };

  const avaibleColumns: {key: string, label: string}[] = []
  for (const table of selectedTables) {
    avaibleColumns.push(
      ...columnsMap[table].map(column => {
        return {
          key: column,
          label: `(${table}) ${column}`
        }
      })
    );
  }

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      size="medium"
      disabled={avaibleColumns.length === 0}
    >
      <InputLabel id="relative-tables">Colunas</InputLabel>
      <Select
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
