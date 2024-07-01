import { Box, Button, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FilterComponent } from "./filter/filter-component";
import { CoreAttributesComponent } from "./core-attributes/core-attributes-component";
import { AggregationComponent } from "./aggregation/aggregation-component";
import { IRequestWS } from "../../web/interface";

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
  >([{ id: Date.now().toString(), column: "", value: "", operation: "" }]);

  useEffect(() => {
    setRelativesTables([]);
  }, [baseTableState]);

  useEffect(() => {
    setColumns([]);
  }, [baseTableState, relativesTablesState]);

  useEffect(() => {
    setAggregationColumn("");
  }, [columnsState]);

  const columnsMap: Record<string, string[]> = {
    profile: [
      "id",
      "first_name",
      "last_name",
      "full_name",
      "city",
      "state",
      "languages",
      "school",
      "company_id",
    ],
    company: [
      "company_id",
      "name",
      "description",
      "company_size",
      "country",
      "state",
      "city",
      "zip_code",
      "adress",
      "url",
    ],
    job: [
      "id",
      "job_id",
      "company_id",
      "title",
      "description",
      "location",
      "med_salary",
      "remote_allowed",
      "work_type",
      "application_url",
      "expiry",
    ],
  };

  const selectedTables: string[] = [];
  if (baseTableState) {
    selectedTables.push(baseTableState);
  }

  if (relativesTablesState.length > 0) {
    selectedTables.push(...relativesTablesState);
  }

  const avaibleColumns: { key: string; label: string }[] = [];
  for (const table of selectedTables) {
    avaibleColumns.push(
      ...columnsMap[table].map((column) => {
        return {
          key: `${table}.${column}`,
          label: `(${table}) ${column}`,
        };
      })
    );
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
    const payload: IRequestWS = {
      baseTable: baseTableState,
      columns: columnsState,
      tables: relativesTablesState,
      aggregation: aggregationState,
      aggregationColumn: aggregationColumnState,
      filter: filterComponents.map((props) => {
        return {
          column: props.column,
          [props.operation]: props.value,
        };
      }),
    };
    console.log(payload);
  };

  return (
    <>
      <Box component="section" display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column">
          <CoreAttributesComponent
            baseTableState={baseTableState}
            relativesTablesState={relativesTablesState}
            columnsState={columnsState}
            avaibleColumns={avaibleColumns}
            setBaseTable={setBaseTable}
            setRelativesTables={setRelativesTables}
            setColumns={setColumns}
          />

          <AggregationComponent
            aggregationState={aggregationState}
            selectedColumns={selectedTables}
            aggregationColumnState={aggregationColumnState}
            setAggregation={setAggregation}
            setAggregationColumn={setAggregationColumn}
          />
        </Box>

        <Box>
          <h2>Filtro</h2>
          <Stack direction="row">
            {filterComponents.map(({ id, column, value, operation }) => (
              <FilterComponent
                avaibleColumns={avaibleColumns}
                disabled={avaibleColumns.length === 0}
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
          </Stack>
        </Box>
      </Box>
      <Button variant="contained" onClick={() => submitForm()}>
        Enviar
      </Button>
    </>
  );
}