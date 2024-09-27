import React, { useEffect, useState } from "react";
import { Table, Tag, Flex } from "antd";
import Icon from "@ant-design/icons";

import { HTMLContent } from "./shared/Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { formatCellLineId, getCloneSummary } from "../utils";
import { WHITE } from "../style/theme";
import { debounce } from "lodash";

const Tube = require("../img/tube.svg");
const CertificateIcon = require("../img/cert-icon.svg");

const {
    tableTitle,
    container,
    snpColumn,
    actionButton,
    comingSoon,
    cloneNumber,
    hoverColumn,
    footer,
    clones,
    cellLineId,
    expandableContent,
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
    const inProgress = status?.toLowerCase() === "coming soon";

    const useWindowWidth = () => {
        const tabletBreakpoint = 768;
        const [isMobile, setIsMobile] = useState(
            window.innerWidth <= tabletBreakpoint
        );

        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= tabletBreakpoint);
            };
            const debouncedHandleResize = debounce(handleResize, 200);
            window.addEventListener("resize", debouncedHandleResize);
            return () => {
                window.removeEventListener("resize", debouncedHandleResize);
            };
        }, []);
        return isMobile;
    };

    const hasExpandableData = useWindowWidth();
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
            >
                <div>
                    <label>Gene Symbol & Name:</label>
                    <span key={record.cell_line_id}>{record.diseaseGene}</span>
                </div>
                <div>
                    {renderCloneSummary(
                        getCloneSummary(record.clones).numMutants,
                        getCloneSummary(record.clones).numIsogenics,
                        index
                    )}
                </div>
            </Flex>
        ),
    };

    return (
        <>
            <Table
                key={diseaseName}
                className={[container, inProgress ? comingSoon : ""].join(" ")}
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
                expandable={hasExpandableData ? expandableConfig : undefined}
                columns={[
                    {
                        title: "Cell Collection ID",
                        key: "cell_line_id",
                        className: cellLineId,
                        dataIndex: "cell_line_id",
                        fixed: "left",
                        render: (cell_line_id: string) => (
                            <h4 key={cell_line_id}>
                                {formatCellLineId(cell_line_id)}
                            </h4>
                        ),
                    },
                    {
                        title: "SNP",
                        key: "snp",
                        dataIndex: "snp",
                        className: snpColumn,
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
                        key: "diseaseGene",
                        dataIndex: "diseaseGene",
                        responsive: ["md"],
                    },
                    {
                        title: "Parental Line",
                        key: "parentalLine",
                        dataIndex: "parentalLine",
                        responsive: ["md"],
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
                    },
                    {
                        title: "",
                        key: "order_link",
                        dataIndex: "order_link",
                        className: hoverColumn,
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
                        className: hoverColumn,
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
