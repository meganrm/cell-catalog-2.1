import React from "react";
import { Table, Tag, Flex, Button } from "antd";

import Content from "./Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { formatCellLineId } from "../utils";

import {
    tableTitle,
    container,
    footerContainer,
    snpColumn,
    actionButton,
} from "./disease-table.module.css";

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
    return (
        <Table
            key={diseaseName}
            className={container}
            title={() => (
                <Flex>
                    <h3 className={tableTitle}>{diseaseName}</h3>
                    {status === "Coming soon" ? (
                        <Tag color="#00215F">{status}</Tag>
                    ) : null}
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
                },
                {
                    title: "Gene symbol & name",
                    width: 280,
                    key: "diseaseGene",
                    dataIndex: "diseaseGene",
                },
                {
                    title: "Parental Line",
                    key: "parentalLine",
                    dataIndex: "parentalLine",
                },
                { title: "Clones", key: "clones", dataIndex: "clones" },
                {
                    title: "",
                    key: "order_link",
                    dataIndex: "order_link",
                    render: (order_link) => (
                        <Button className={ actionButton } ghost href={order_link}>
                            Obtain Line
                        </Button>
                    ),
                },
                {
                    title: "",
                    key: "certificate_of_analysis",
                    dataIndex: "certificate_of_analysis",
                    render: (certificate_of_analysis) => {
                        return (
                            certificate_of_analysis && (
                                <Button
                                    className={actionButton}
                                    ghost
                                    href={certificate_of_analysis.publicURL}
                                    target="_blank"
                                >
                                    Cert. of Analysis
                                </Button>
                            )
                        );
                    },
                },
            ]}
            dataSource={diseaseCellLines}
            footer={() => (
                <div className={footerContainer}>
                    <Content content={acknowledgements} />
                </div>
            )}
        />
    );
};

export default DiseaseTable;
