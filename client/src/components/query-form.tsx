import { Box, Button, FormGroup, IconButton } from "@mui/material";
import { BaseTableSelect } from "../query-form/base-table-select";
import { RelativeTablesSelect } from "../query-form/relative-tables-select";
import { useEffect, useState } from "react";
import { ColumnsSelect } from "../query-form/columns-select";
import { AggregationSelect } from "../query-form/agregation-select";
import { ColumnAggregationSelect } from "../query-form/column-aggregation-select";
import { FilterSelect } from "../query-form/filter-select";
import { FilterColumnSelect } from "../query-form/filter-column";
import { FilterValueInput } from "../query-form/filter-value-input";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type FilterComponentsProps = {
  id: string;
  value: string;
  column: string;
  operation: string;
};

export function QueryForm() {
  const [baseTableState, setBaseTable] = useState("");
  const [relativesTablesState, setRelativesTables] = useState<string[]>([]);
  const [columnsState, setColumns] = useState<string[]>([]);
  const [aggregationState, setAggregation] = useState("");
  const [aggregationColumnState, setAggregationColumn] = useState("");
  const [filterComponents, setFilterComponents] = useState<
    FilterComponentsProps[]
  >([]);

  useEffect(() => {
    setRelativesTables([]);
  }, [baseTableState]);

  useEffect(() => {
    setColumns([]);
  }, [baseTableState, relativesTablesState]);

  useEffect(() => {
    setAggregationColumn("");
  }, [columnsState]);

  const selectedTables: string[] = [];

  if (baseTableState) {
    selectedTables.push(baseTableState);
  }

  if (relativesTablesState.length > 0) {
    selectedTables.push(...relativesTablesState);
  }

  const addFilterForm = () => {
    setFilterComponents([
      ...filterComponents,
      { id: Date.now().toString(), column: "", value: "", operation: "" },
    ]);
  };

  const removeFilterForm = (id: string) => {
    setFilterComponents((values) => values.filter((value) => value.id !== id));
  };

  const updateFilterComponentValue = (id: string, value: string) => {
    setFilterComponents((values) => {
      const filterComponent = values.find((value) => value.id === id);

      if (!filterComponent) {
        return [...values];
      }

      filterComponent.value = value;

      return [...values];
    });
  };

  const updateFilterComponentColumn = (id: string, column: string) => {
    setFilterComponents((values) => {
      const filterComponent = values.find((value) => value.id === id);

      if (!filterComponent) {
        return [...values];
      }

      filterComponent.column = column;

      return [...values];
    });
  };

  const updateFilterComponentOperation = (id: string, operation: string) => {
    setFilterComponents((values) => {
      const filterComponent = values.find((value) => value.id === id);

      if (!filterComponent) {
        return [...values];
      }

      filterComponent.operation = operation;

      return [...values];
    });
  };

  const submitForm = () => {
    console.log({
      baseTableState,
      relativesTablesState,
      columnsState,
      aggregationState,
      aggregationColumnState,
      filterComponents,
    });
  };

  return (
    <FormGroup>
      <Box component="section">
        <BaseTableSelect
          baseTableState={baseTableState}
          updateStateFn={setBaseTable}
        />
        <RelativeTablesSelect
          baseTable={baseTableState}
          relativeTablesState={relativesTablesState}
          updateStateFn={setRelativesTables}
        />

        <ColumnsSelect
          columns={columnsState}
          selectedTables={selectedTables}
          updateStateFn={setColumns}
        />

        <AggregationSelect
          disabled={columnsState.length === 0}
          aggregationState={aggregationState}
          updateStateFn={setAggregation}
        />

        <ColumnAggregationSelect
          aggregationColumnState={aggregationColumnState}
          updateStateFn={setAggregationColumn}
          selectedColumns={columnsState}
          disabled={columnsState.length === 0 && aggregationState === ""}
        />

        {filterComponents.map(({ id, column, value, operation }) => (
          <FilterComponent
            selectedColumns={columnsState}
            disabled={columnsState.length === 0}
            key={id}
            columnState={column}
            operationState={operation}
            valueState={value}
            dataKey={id}
            setColumn={updateFilterComponentColumn}
            setOperation={updateFilterComponentOperation}
            setValue={updateFilterComponentValue}
            removeFn={() => removeFilterForm(id)}
          />
        ))}

        <IconButton onClick={addFilterForm}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Button onClick={() => submitForm()}>Enviar</Button>
    </FormGroup>
  );
}

function FilterComponent({
  selectedColumns,
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
  selectedColumns: string[];
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
        selectedColumns={selectedColumns}
        updateStateFn={(value) => setColumn(dataKey, value)}
        disabled={disabled && operationState === ""}
      />

      <FilterSelect
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
