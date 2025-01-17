import React, { useState } from "react";
import { Link } from "gatsby";
import { Table, Tag, Flex } from "antd";
import Icon from "@ant-design/icons";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import { HTMLContent } from "./shared/Content";
import {
    CellLineStatus,
    UnpackedDiseaseCellLine,
} from "../component-queries/types";
import { formatCellLineId, getCloneSummary } from "../utils";
import { WHITE } from "../style/theme";
import useWindowWidth from "../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../constants";
import GeneDisplay from "./GeneDisplay";
import ParentalLineModal from "./ParentalLineModal";

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
                key={record.cellLineId}
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
                    <span>
                        <GeneDisplay gene={record.mutatedGene} />
                    </span>
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
                    navigate(record.path);
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
                        key: "cellLineId",
                        className: cellLineId,
                        dataIndex: "cellLineId",
                        fixed: "left",
                        render: (cellLineId, record) => {
                            const cellLine = (
                                <h4 key={cellLineId}>
                                    {formatCellLineId(cellLineId)}
                                </h4>
                            );
                            return record.status ===
                                CellLineStatus.DataComplete ? (
                                <Link to={record.path}>{cellLine}</Link>
                            ) : (
                                cellLine
                            );
                        },
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
                        key: "mutatedGene",
                        dataIndex: "mutatedGene",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                        render: (mutatedGene) => {
                            return <GeneDisplay gene={mutatedGene} />;
                        },
                    },
                    {
                        title: "Parental Line",
                        key: "parentalLine",
                        dataIndex: "parentalLine",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                        render: (parentalLine, record) => {
                            return (
                                <ParentalLineModal
                                    key={parentalLine.cellLineId}
                                    formattedId={formatCellLineId(
                                        parentalLine.cellLineId
                                    )}
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
                        key: "certificateOfAnalysis",
                        dataIndex: "certificateOfAnalysis",
                        className: actionColumn,
                        fixed: "right",
                        responsive: ["md"],
                        render: (certificateOfAnalysis) => {
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
