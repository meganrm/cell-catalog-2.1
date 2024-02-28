import React from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

import Content from "./Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { formatCellLineId } from "../utils";

import {
    tableTitle,
    container,
    footerContainer,
} from "./disease-table.module.css";

interface DiseaseTableProps {
    diseaseName: string;
    diseaseCellLines: UnpackedDiseaseCellLine[];
    acknowledgements: string;
}

const DiseaseTable = ({
    diseaseName,
    diseaseCellLines,
    acknowledgements,
}: DiseaseTableProps) => {
    return (
        <Table
            key={diseaseName}
            className={container}
            title={() => <h3 className={tableTitle}>{diseaseName}</h3>}
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
                { title: "SNP", key: "snp", dataIndex: "snp" },
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
                { title: "", key: "order_link", dataIndex: "order_link" },
                {
                    title: "",
                    key: "certificate_of_analysis",
                    dataIndex: "certificate_of_analysis",
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
