import React, { useState } from "react";
import { Link } from "gatsby";
import { Table, Tag, Flex } from "antd";
import Icon from "@ant-design/icons";

import { HTMLContent } from "./shared/Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { CellLineStatus } from "../component-queries/types";
import { formatCellLineId, getCloneSummary } from "../utils";
import { WHITE } from "../style/theme";
import useWindowWidth from "../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../constants";

const Tube = require("../img/tube.svg");
const CertificateIcon = require("../img/cert-icon.svg");

const {
    tableTitle,
    container,
    snpColumn,
    actionButton,
    comingSoon,
    cloneNumber,
    actionColumn,
    footer,
    clones,
    cellLineId,
    expandableContent,
    hoveredRow,
    dataComplete,
} = require("../style/disease-table.module.css");

interface DiseaseTableProps {
    diseaseName: string;
    diseaseCellLines: UnpackedDiseaseCellLine[];
    acknowledgements: string;
    status: string;
}

const DiseaseTable = ({
    diseaseName,
    diseaseCellLines,
    acknowledgements,
    status,
}: DiseaseTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
    const inProgress = status?.toLowerCase() === "coming soon";

    const width = useWindowWidth();
    const isTablet = width < TABLET_BREAKPOINT;
    const isMobile = width < MOBILE_BREAKPOINT;
    const renderCloneSummary = (
        numMutants: number,
        numIsogenics: number,
        index: number
    ) => (
        <Flex vertical={true} key={index}>
            <div>
                <span className={cloneNumber} key={numMutants}>
                    {numMutants}
                </span>
                <span> mutant clones</span>
            </div>
            <div>
                <span className={cloneNumber} key={numIsogenics}>
                    {numIsogenics}
                </span>
                <span> isogenic controls</span>
            </div>
        </Flex>
    );
    const expandableConfig = {
        expandedRowRender: (record: UnpackedDiseaseCellLine, index: number) => (
            <Flex
                key={record.cell_line_id}
                gap={16}
                justify="flex-start"
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
                    <span>{record.diseaseGene}</span>
                </div>
                <div>
                    <label>Clones:</label>

                    {renderCloneSummary(
                        getCloneSummary(record.clones).numMutants,
                        getCloneSummary(record.clones).numIsogenics,
                        index
                    )}
                </div>
            </Flex>
        ),
    };

    const onCellInteraction = (
        record: UnpackedDiseaseCellLine,
        index: number | undefined
    ) => {
        if (index === undefined) {
            return {};
        }
        return {
            className: index === hoveredRowIndex ? hoveredRow : "",
            onMouseEnter: () => setHoveredRowIndex(index),
            onMouseLeave: () => setHoveredRowIndex(-1),
            onClick: () => {
                if (record.status === CellLineStatus.DataComplete) {
                    // if (true)
                    window.location.href = `/disease-cell-line/AICS-${record.cell_line_id}`;
                }
            },
        };
    };

    return (
        <>
            <Table
                key={diseaseName}
                className={[container, inProgress ? comingSoon : ""].join(" ")}
                rowClassName={(record) =>
                    record.status === CellLineStatus.DataComplete
                        ? dataComplete
                        : ""
                }
                title={() => (
                    <Flex align="center">
                        <h3 className={tableTitle}>{diseaseName}</h3>
                        {inProgress ? (
                            <Tag color="#00215F">{status}</Tag>
                        ) : null}
                    </Flex>
                )}
                scroll={{ x: "max-content" }}
                pagination={false}
                expandable={isTablet ? expandableConfig : undefined}
                columns={[
                    {
                        title: "Cell Collection ID",
                        key: "cell_line_id",
                        className: cellLineId,
                        dataIndex: "cell_line_id",
                        fixed: "left",
                        render: (cell_line_id, record) =>
                            record.status === CellLineStatus.DataComplete ? (
                                <Link
                                    to={`/disease-cell-line/AICS-${cell_line_id}`}
                                >
                                    <h4 key={cell_line_id}>
                                        {formatCellLineId(cell_line_id)}
                                    </h4>
                                </Link>
                            ) : (
                                <h4 key={cell_line_id}>
                                    {formatCellLineId(cell_line_id)}
                                </h4>
                            ),
                        onCell: onCellInteraction,
                    },
                    {
                        title: "SNP",
                        key: "snp",
                        dataIndex: "snp",
                        className: snpColumn,
                        responsive: ["sm"],
                        render: (snp: string) => {
                            const snps = snp.split(":");
                            return (
                                <Flex vertical={true} key={snp}>
                                    <span key={"snp-0"}>{snps[0]}: </span>
                                    <span key={"snp-1"}>{snps[1]}</span>
                                </Flex>
                            );
                        },
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Gene Symbol & Name",
                        width: 280,
                        key: "diseaseGene",
                        dataIndex: "diseaseGene",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Parental Line",
                        key: "parentalLine",
                        dataIndex: "parentalLine",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Clones",
                        key: "clones",
                        dataIndex: "clones",
                        className: clones,
                        responsive: ["md"],
                        render: (clones, _, index) => {
                            const { numMutants, numIsogenics } =
                                getCloneSummary(clones);

                            return renderCloneSummary(
                                numMutants,
                                numIsogenics,
                                index
                            );
                        },
                        onCell: onCellInteraction,
                    },
                    {
                        title: "",
                        key: "order_link",
                        dataIndex: "order_link",
                        className: actionColumn,
                        fixed: "right",
                        render: (order_link) => {
                            if (inProgress) {
                                return <>{""}</>; // still want a blank column
                            } else {
                                return (
                                    <a
                                        key={order_link}
                                        className={actionButton}
                                        href={order_link}
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
                        key: "certificate_of_analysis",
                        dataIndex: "certificate_of_analysis",
                        className: actionColumn,
                        fixed: "right",
                        responsive: ["md"],
                        render: (certificate_of_analysis) => {
                            return (
                                certificate_of_analysis && (
                                    <a
                                        key={certificate_of_analysis}
                                        className={actionButton}
                                        href={certificate_of_analysis}
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
                ]}
                dataSource={diseaseCellLines}
            />
            <div className={footer}>
                <HTMLContent content={acknowledgements} />
            </div>
        </>
    );
};

export default DiseaseTable;
