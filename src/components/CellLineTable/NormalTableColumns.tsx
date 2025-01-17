import React from "react";
import { Flex, GetProp, Table } from "antd";
import Icon from "@ant-design/icons";

import {
    UnpackedGene,
    UnpackedNormalCellLine,
} from "../../component-queries/types";
import GeneDisplay from "../GeneDisplay";
import { WHITE } from "../../style/theme";
import { CellLineColumns, mdBreakpoint } from "./types";
import {
    cellLineIdColumn,
    certificateOfAnalysisColumn,
    getObtainLineColumn,
} from "./SharedColumns";

const {
    actionButton,
    actionColumn,
    lastColumn,
} = require("../../style/table.module.css");

export const getNormalTableColumns = (
    inProgress: boolean
): CellLineColumns<UnpackedNormalCellLine> => [
    { ...cellLineIdColumn },
    {
        title: "Protein",
        key: "protein",
        dataIndex: "protein",
        width: 200,
        responsive: mdBreakpoint,
    },
    {
        title: "Gene Symbol & Name",
        width: 280,
        key: "taggedGene",
        dataIndex: "taggedGene",
        responsive: mdBreakpoint,
        render: (taggedGene: UnpackedGene) => {
            return <GeneDisplay gene={taggedGene} />;
        },
    },
    {
        title: "Clone",
        key: "cloneNumber",
        dataIndex: "cloneNumber",
        responsive: mdBreakpoint,
    },
    {
        title: "Tagged Alleles",
        key: "alleleCount",
        dataIndex: "alleleCount",
        responsive: mdBreakpoint,
    },
    {
        title: "Structure",
        key: "structure",
        width: 280,
        dataIndex: "structure",
        responsive: mdBreakpoint,
    },
    {
        title: "Fluorescent Tag",
        key: "fluorescentTag",
        dataIndex: "fluorescentTag",
        responsive: mdBreakpoint,
    },
    {
        title: "Tag Location",
        key: "tagLocation",
        dataIndex: "tagLocation",
        className: lastColumn,
        responsive: mdBreakpoint,
    },
    { ...getObtainLineColumn(inProgress) },
    { ...certificateOfAnalysisColumn },
];
