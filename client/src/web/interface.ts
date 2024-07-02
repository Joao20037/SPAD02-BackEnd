export interface IRequestWS {
    baseTable: string,
    tables: string[],
    columns: string[],
    aggregation?: string,
    aggregationColumn?: string,
    filter?: Filter[]
}

export type Filter = {
    column: string,
    gt?: string | number,
    gte?: string | number,
    lt?: string | number,
    lte?: string | number,
    equal?: string | number,
}

export interface IResponseWS {
    tableContent: {
        headers: {key: string, label: string}[],
        rows: Record<string, string>[]
    }
}