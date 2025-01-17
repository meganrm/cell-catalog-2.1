import { Link } from "gatsby";
import React from "react";
import { formatCellLineId } from "../utils";
import {
    CellLineStatus,
    UnpackedGene,
    UnpackedNormalCellLine,
} from "../component-queries/types";
import GeneDisplay from "./GeneDisplay";
import { Flex } from "antd";
import Icon from "@ant-design/icons";
import { WHITE } from "../style/theme";
import { mdBreakpoint } from "./TableColumns";
const Tube = require("../img/tube.svg");
const CertificateIcon = require("../img/cert-icon.svg");

const {
    actionButton,
    actionColumn,
    cellLineId,
    lastColumn,
} = require("../style/table.module.css");

export const getNormalTableColumns = (
    onCellInteraction: (
        record: UnpackedNormalCellLine,
        index: number | undefined
    ) => {},
    inProgress: boolean
) => [
    {
        title: "Cell Collection ID",
        key: "cellLineId",
        className: cellLineId,
        dataIndex: "cellLineId",
        fixed: "left" as const,
        render: (cellLineId: number, record: UnpackedNormalCellLine) => {
            const cellLine = (
                <h4 key={cellLineId}>{formatCellLineId(cellLineId)}</h4>
            );
            return record.status === CellLineStatus.DataComplete ? (
                <Link to={record.path}>{cellLine}</Link>
            ) : (
                cellLine
            );
        },
        onCell: onCellInteraction,
    },
    {
        title: "Protein",
        key: "protein",
        dataIndex: "protein",
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
    },
    {
        title: "Gene Symbol & Name",
        width: 280,
        key: "taggedGene",
        dataIndex: "taggedGene",
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
        render: (taggedGene: UnpackedGene) => {
            return <GeneDisplay gene={taggedGene} />;
        },
    },
    {
        title: "Clone",
        key: "cloneNumber",
        dataIndex: "cloneNumber",
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
    },
    {
        title: "Tagged Alleles",
        key: "alleleCount",
        dataIndex: "alleleCount",
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
    },
    {
        title: "Structure",
        key: "structure",
        dataIndex: "structure",
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
    },
    {
        title: "Fluorescent Tag",
        key: "fluorescentTag",
        dataIndex: "fluorescentTag",
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
    },
    {
        title: "Tag Location",
        key: "tagLocation",
        dataIndex: "tagLocation",
        className: lastColumn,
        responsive: mdBreakpoint,
        onCell: onCellInteraction,
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
    {
        title: "",
        key: "certificateOfAnalysis",
        dataIndex: "certificateOfAnalysis",
        className: actionColumn,
        fixed: "right" as const,
        responsive: mdBreakpoint,
        render: (certificateOfAnalysis: string) => {
            return (
                certificateOfAnalysis && (
                    <a
                        key={certificateOfAnalysis}
                        className={actionButton}
                        href={certificateOfAnalysis}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Flex>
                            <Icon
                                component={CertificateIcon}
                                style={{
                                    color: WHITE,
                                    fontSize: "40px",
                                }}
                            />
                            Cert. of Analysis
                        </Flex>
                    </a>
                )
            );
        },
    },
];
