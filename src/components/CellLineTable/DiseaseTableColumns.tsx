import React from "react";
import { Flex } from "antd";
import classNames from "classnames";

import {
    Clone,
    UnpackedDiseaseCellLine,
    UnpackedGene,
    UnpackedNormalCellLine,
} from "../../component-queries/types";
import { formatCellLineId, getCloneSummary } from "../../utils";
import GeneDisplay from "../GeneDisplay";
import ParentalLineModal from "../ParentalLineModal";
import CloneSummary from "../CloneSummary";

import {
    cellLineIdColumn,
    certificateOfAnalysisColumn,
    obtainLineColumn,
} from "./SharedColumns";
import { smBreakPoint, mdBreakpoint, CellLineColumns } from "./types";

const {
    clones,
    lastColumn,
    snpColumn,
} = require("../../style/table.module.css");

export const getDiseaseTableColumns = (
    inProgress: boolean
): CellLineColumns<UnpackedDiseaseCellLine> => {
    const columns = [
        { ...cellLineIdColumn },
        {
            title: "SNP",
            key: "snp",
            dataIndex: "snp",
            className: snpColumn,
            responsive: smBreakPoint,
            render: (snp: string) => {
                const snps = snp.split(":");
                return (
                    <Flex vertical={true} key={snp}>
                        <span key={"snp-0"}>{snps[0]}: </span>
                        <span key={"snp-1"}>{snps[1]}</span>
                    </Flex>
                );
            },
        },
        {
            title: "Gene Symbol & Name",
            width: 280,
            key: "mutatedGene",
            dataIndex: "mutatedGene",
            responsive: mdBreakpoint,
            render: (mutatedGene: UnpackedGene) => {
                return <GeneDisplay gene={mutatedGene} />;
            },
        },
        {
            title: "Parental Line",
            key: "parentalLine",
            dataIndex: "parentalLine",
            responsive: mdBreakpoint,
            render: (
                parentalLine: UnpackedNormalCellLine,
                record: UnpackedDiseaseCellLine
            ) => {
                return (
                    <ParentalLineModal
                        key={parentalLine.cellLineId}
                        formattedId={formatCellLineId(parentalLine.cellLineId)}
                        cloneNumber={parentalLine.cloneNumber}
                        image={parentalLine.thumbnailImage}
                        taggedGene={parentalLine.taggedGene}
                        status={record.diseaseStatus}
                        tagLocation={parentalLine.tagLocation}
                        fluorescentTag={parentalLine.fluorescentTag}
                    />
                );
            },
        },
        {
            title: "Clones",
            key: "clones",
            dataIndex: "clones",
            className: classNames(clones, { [lastColumn]: !inProgress }),
            responsive: mdBreakpoint,
            render: (clones: Clone[], _: any, index: number) => {
                const { numMutants, numIsogenics } = getCloneSummary(clones);
                return (
                    <CloneSummary
                        numMutants={numMutants}
                        numIsogenics={numIsogenics}
                        index={index}
                    />
                );
            },
        },
    ];

    if (!inProgress) {
        return [
            ...columns,
            { ...obtainLineColumn },
            { ...certificateOfAnalysisColumn },
        ];
    }
    return columns;
};
