import { Table } from "antd";
import React from "react";

const { container, row, footer } = require("../style/clone-table.module.css");

interface CloneTableProps {
    dataSource: any[];
}

const CloneTable: React.FC<CloneTableProps> = ({ dataSource }) => {
    const cloneTableColumns = [
        {
            title: "Clone Number",
            dataIndex: "clone_number",
            key: "clone_number",
        },
        {
            title: "Clone Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Transfection Replicate",
            dataIndex: "transfection_replicate",
            key: "transfection_replicate",
        },
        {
            title: "Genotype",
            dataIndex: "genotype",
            key: "genotype",
        },
    ];
    return (
        <>
            <Table
                className={container}
                columns={cloneTableColumns}
                dataSource={dataSource}
                pagination={false}
                bordered={false}
                rowClassName={row}
            />
            <div className={footer}>
                Clones were derived from separate replicated transfections.
                Comparisons between clones of different genotypes recommended
                from same replicate.
            </div>
        </>
    );
};

export default CloneTable;
