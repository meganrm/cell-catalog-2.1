import React from "react";
import { Flex, GetProp, Table } from "antd";

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
import Icon from "@ant-design/icons";
import { WHITE } from "../../style/theme";
import { cellLineIdColumn, certificateOfAnalysisColumn } from "./SharedColumns";
import { smBreakPoint, mdBreakpoint, CellLineColumns } from "./types";

const Tube = require("../../img/tube.svg");

const {
    actionButton,
    actionColumn,
    clones,
    lastColumn,
    snpColumn,
} = require("../../style/table.module.css");

export const getDiseaseTableColumns = (
    inProgress: boolean
): CellLineColumns<UnpackedDiseaseCellLine> => [
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
        className: [clones, lastColumn].join(" "),
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
    {
        title: "",
        key: "orderLink",
        dataIndex: "orderLink",
        className: actionColumn,
        fixed: "right" as const,
        render: (orderLink: string) => {
            if (inProgress) {
                return <>{""}</>; // still want a blank column
            } else {
                return (
                    <a
                        key={orderLink}
                        className={actionButton}
                        href={orderLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Flex>
                            <Icon
                                component={Tube}
                                style={{
                                    color: WHITE,
                                    fontSize: "40px",
                                }}
                            />
                            Obtain Collection
                        </Flex>
                    </a>
                );
            }
        },
    },
    { ...certificateOfAnalysisColumn },
];
