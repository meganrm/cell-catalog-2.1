import { Flex } from "antd";
import React from "react";

import {
    UnpackedDiseaseCellLine,
    UnpackedNormalCellLine,
} from "../../component-queries/types";
import { getCloneSummary } from "../../utils";
import CloneSummary from "../CloneSummary";
import GeneDisplay from "../GeneDisplay";
import { getDiseaseTableColumns } from "./DiseaseTableColumns";
import { getNormalTableColumns } from "./NormalTableColumns";
import {
    DiseaseColumns,
    DiseaseTableConfig,
    NormalColumns,
    NormalTableConfig,
    TableType,
} from "./types";

const { expandableContent } = require("../../style/table.module.css");

const getDiseaseTableMobileConfig = (isMobile: boolean) => {
    return {
        expandedRowRender: (record: UnpackedDiseaseCellLine, index: number) => (
            <Flex
                key={record.cellLineId}
                gap={16}
                justify={"flex-start" as const}
                className={expandableContent}
                wrap={"wrap"}
            >
                {isMobile && (
                    <div>
                        <label>SNP:</label>
                        <Flex vertical={true} key={record.snp}>
                            <span key={"snp-0"}>
                                {record.snp.split(":")[0]}:{" "}
                            </span>
                            <span key={"snp-1"}>
                                {record.snp.split(":")[1]}
                            </span>
                        </Flex>
                    </div>
                )}
                <div>
                    <label>Gene Symbol & Name:</label>
                    <span>
                        <GeneDisplay gene={record.mutatedGene} />
                    </span>
                </div>
                <div>
                    <label>Clones:</label>
                    <CloneSummary
                        numMutants={getCloneSummary(record.clones).numMutants}
                        numIsogenics={
                            getCloneSummary(record.clones).numIsogenics
                        }
                        index={index}
                    />
                </div>
            </Flex>
        ),
    };
};

const normalTableMobileConfig = (isMobile: boolean) => {
    return {
        expandedRowRender: (record: UnpackedNormalCellLine) => (
            <Flex
                key={record.cellLineId}
                gap={16}
                justify={"flex-start" as const}
                className={expandableContent}
                wrap={"wrap" as const}
            >
                {isMobile && (
                    <div>
                        <label>Tagged Protein:</label>
                        <Flex vertical={true} key={record.protein}>
                            <span key={record.protein}>{record.protein}</span>
                        </Flex>
                    </div>
                )}
                <div>
                    <label>Gene Symbol & Name:</label>
                    <span>
                        <GeneDisplay gene={record.taggedGene} />
                    </span>
                </div>
            </Flex>
        ),
    };
};

const getMobileConfig = (type: TableType, isMobile: boolean) => {
    if (type === TableType.Normal) {
        return normalTableMobileConfig(isMobile);
    }
    return getDiseaseTableMobileConfig(isMobile);
};

const getTableColumns = (
    tableType: TableType,
    onCellInteraction: any,
    inProgress: boolean
): NormalColumns | DiseaseColumns => {
    return tableType === TableType.Disease
        ? getDiseaseTableColumns(onCellInteraction, inProgress)
        : getNormalTableColumns(onCellInteraction, inProgress);
};

export const getConfig = (
    tableType: TableType,
    isMobile: boolean,
    onCellInteraction: any,
    inProgress: boolean,
    cellLines: UnpackedDiseaseCellLine[] | UnpackedNormalCellLine[]
): NormalTableConfig | DiseaseTableConfig => {
    const mobileConfig = getMobileConfig(tableType, isMobile);
    const columns = getTableColumns(tableType, onCellInteraction, inProgress);
    if (tableType === TableType.Disease) {
        return {
            columns,
            expandableConfig: mobileConfig,
            cellLines,
        } as DiseaseTableConfig;
    }
    return {
        columns,
        expandableConfig: mobileConfig,
        cellLines,
    } as NormalTableConfig;
};
