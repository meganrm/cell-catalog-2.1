import { Link } from "gatsby";
import React from "react";
import {
    UnpackedDiseaseCellLine,
    UnpackedNormalCellLine,
    CellLineStatus,
} from "../../component-queries/types";
import { formatCellLineId } from "../../utils";

const { cellLineId } = require("../../style/table.module.css");

export const cellLineIdColumn = {
    title: "Cell Collection ID",
    key: "cellLineId",
    className: cellLineId,
    dataIndex: "cellLineId",
    fixed: "left" as const,
    render: (
        cellLineId: number,
        record: UnpackedDiseaseCellLine | UnpackedNormalCellLine
    ) => {
        const cellLine = (
            <h4 key={cellLineId}>{formatCellLineId(cellLineId)}</h4>
        );
        return record.status === CellLineStatus.DataComplete ? (
            <Link to={record.path}>{cellLine}</Link>
        ) : (
            cellLine
        );
    },
};
