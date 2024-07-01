import { FormGroup, IconButton } from "@mui/material";
import { FilterColumnSelect } from "./form-fields/column-select";
import { FilterOperationSelect } from "./form-fields/operation-select";
import { FilterValueInput } from "./form-fields/value-input";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export function FilterComponent({
  avaibleColumns,
  disabled,
  removeFn,
  dataKey,
  columnState,
  operationState,
  valueState,
  setOperation,
  setColumn,
  setValue,
}: {
  columnState: string;
  operationState: string;
  valueState: string;
  avaibleColumns: { key: string; label: string }[];
  disabled: boolean;
  dataKey: string;
  removeFn: (id: string) => void;
  setOperation: (id: string, value: string) => void;
  setColumn: (id: string, value: string) => void;
  setValue: (id: string, value: string) => void;
}) {
  return (
    <FormGroup sx={{ m: 1, minWidth: 120 }}>
      <FilterColumnSelect
        filterColumnState={columnState}
        avaibleColumns={avaibleColumns}
        updateStateFn={(value) => setColumn(dataKey, value)}
        disabled={disabled && operationState === ""}
      />

      <FilterOperationSelect
        filterState={operationState}
        updateStateFn={(value) => setOperation(dataKey, value)}
        disabled={disabled}
      />

      <FilterValueInput
        updateStateFn={(value) => setValue(dataKey, value)}
        valueState={valueState}
        disabled={disabled}
      />

      <IconButton
        onClick={() => {
          removeFn(dataKey);
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
    </FormGroup>
  );
}
