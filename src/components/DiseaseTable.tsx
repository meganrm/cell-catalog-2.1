import React from "react";
import { Table } from "antd";

import Content from "./Content";
import { UnpackedDiseaseCellLine } from "../component-queries/DiseaseCellLines";
import { formatCellLineId } from "../utils";

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
            title={() => diseaseName}
            pagination={false}
            columns={[
                {
                    title: "Cell Line ID",
                    key: "cell_line_id",
                    dataIndex: "cell_line_id",
                    render: (cell_line_id: string) =>
                        formatCellLineId(cell_line_id),
                },
                { title: "SNP", key: "snp", dataIndex: "snp" },
                {
                    title: "Gene symbol & name",
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
            footer={() => <Content content={acknowledgements} />}
        />
    );
};

export default DiseaseTable;
