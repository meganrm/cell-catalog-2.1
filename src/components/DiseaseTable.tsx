import React from "react";
import { Table, Tag, Flex } from "antd";

import HTMLContent from "./Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { formatCellLineId } from "../utils";

const Tube = require("../img/tube.svg");
const CertificateIcon = require("../img/cert-icon.svg");

const {
    tableTitle,
    container,
    snpColumn,
    actionButton,
    clones,
    comingSoon,
    cloneNumber,
} = require("../style/disease-table.module.css");

import { WHITE } from "./Layout";
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
    return (
        <Table
            key={diseaseName}
            className={[container, inProgress ? comingSoon : ""].join(" ")}
            title={() => (
                <Flex align="center">
                    <h3 className={tableTitle}>{diseaseName}</h3>
                    {inProgress ? <Tag color="#00215F">{status}</Tag> : null}
                </Flex>
            )}
            pagination={false}
            columns={[
                {
                    title: "Cell Line ID",
                    key: "cell_line_id",
                    width: 180,
                    dataIndex: "cell_line_id",
                    render: (cell_line_id: string) => (
                        <h4>{formatCellLineId(cell_line_id)}</h4>
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
                            <Flex vertical={true}>
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
                },
                {
                    title: "Parental Line",
                    key: "parentalLine",
                    dataIndex: "parentalLine",
                },
                {
                    title: "Clones",
                    key: "clones",
                    dataIndex: "clones",
                    className: clones,
                    render: ({ mutants, isogenic_controls }) => {
                        return (
                            <Flex vertical={true}>
                                <div>
                                    {" "}
                                    <span className={cloneNumber} key={mutants}>
                                        {mutants}
                                    </span>
                                    <span> mutant clones</span>
                                </div>
                                <div>
                                    <span
                                        className={cloneNumber}
                                        key={isogenic_controls}
                                    >
                                        {isogenic_controls}
                                    </span>
                                    <span> isogenic controls</span>
                                </div>
                            </Flex>
                        );
                    },
                },
                {
                    title: "",
                    key: "order_link",
                    dataIndex: "order_link",
                    render: (order_link) => {
                        if (inProgress) {
                            return <>{""}</>; // still want a blank column
                        } else {
                            return (
                                <a className={actionButton} href={order_link}>
                                    Obtain Line
                                </a>
                            );
                        }
                    },
                },
                {
                    title: "",
                    key: "certificate_of_analysis",
                    dataIndex: "certificate_of_analysis",
                    render: (certificate_of_analysis) => {
                        return (
                            certificate_of_analysis && (
                                <a
                                    className={actionButton}
                                    href={certificate_of_analysis.publicURL}
                                    target="_blank"
                                >
                                    Cert. of Analysis
                                </a>
                            )
                        );
                    },
                },
            ]}
            dataSource={diseaseCellLines}
            footer={() => (
                <div>
                    <HTMLContent
                        content={acknowledgements.replace("*", "<i>")}
                    />
                </div>
            )}
        />
    );
};

export default DiseaseTable;
