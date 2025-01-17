import { GetProp, Table } from "antd";
import {
    UnpackedNormalCellLine,
    UnpackedDiseaseCellLine,
} from "../../component-queries/types";

export enum TableType {
    Disease,
    Normal,
}

export const mdBreakpoint = ["md" as const];
export const smBreakPoint = ["sm" as const];

export type NormalColumns = GetProp<
    typeof Table<UnpackedNormalCellLine>,
    "columns"
>;
export type DiseaseColumns = GetProp<
    typeof Table<UnpackedDiseaseCellLine>,
    "columns"
>;
export type NormalExpandableConfig = {
    expandedRowRender: (record: UnpackedNormalCellLine) => JSX.Element;
};
export type DiseaseExpandableConfig = {
    expandedRowRender: (record: UnpackedDiseaseCellLine) => JSX.Element;
};

export interface NormalTableConfig {
    columns: NormalColumns;
    expandableConfig: NormalExpandableConfig;
    cellLines: UnpackedNormalCellLine[];
}

export interface DiseaseTableConfig {
    columns: DiseaseColumns;
    expandableConfig: DiseaseExpandableConfig;
    cellLines: UnpackedDiseaseCellLine[];
}
