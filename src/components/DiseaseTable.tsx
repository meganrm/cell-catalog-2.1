import React from "react";
import { Table, Tag, Flex } from "antd";
import Icon from "@ant-design/icons";

import { HTMLContent } from "./Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { formatCellLineId } from "../utils";

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
    cellLineId,
} = require("../style/disease-table.module.css");
import { WHITE } from "./Layout";
import { Link } from "gatsby";

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
                pagination={false}
                columns={[
                    {
                        title: "Cell Collection ID",
                        key: "cell_line_id",
                        className: cellLineId,
                        width: 180,
                        dataIndex: "cell_line_id",
                        render: (cell_line_id: string, record) => (
                            <Link to={record.path}>
                                <h4 key={cell_line_id}>
                                    {formatCellLineId(cell_line_id)}
                                </h4>
                            </Link>
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
                    },
                    {
                        title: "Parental Line",
                        key: "parentalLine",
                        dataIndex: "parentalLine",
                    },
                    // {
                    //     title: "Clones",
                    //     key: "clones",
                    //     dataIndex: "clones",
                    //     className: clones,
                    //     render: ({ mutants, isogenic_controls }) => {
                    //         return (
                    //             <Flex vertical={true} key={mutants}>
                    //                 <div>
                    //                     {" "}
                    //                     <span
                    //                         className={cloneNumber}
                    //                         key={mutants}
                    //                     >
                    //                         {mutants}
                    //                     </span>
                    //                     <span> mutant clones</span>
                    //                 </div>
                    //                 <div>
                    //                     <span
                    //                         className={cloneNumber}
                    //                         key={isogenic_controls}
                    //                     >
                    //                         {isogenic_controls}
                    //                     </span>
                    //                     <span> isogenic controls</span>
                    //                 </div>
                    //             </Flex>
                    //         );
                    //     },
                    // },
                    {
                        title: "",
                        key: "order_link",
                        dataIndex: "order_link",
                        className: hoverColumn,
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
