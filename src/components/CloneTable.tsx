import { Table } from "antd";
import React from "react";
import { Clone } from "../component-queries/types";

const { container, row } = require("../style/clone-table.module.css");

interface CloneTableProps {
    dataSource: Clone[];
}

const CloneTable: React.FC<CloneTableProps> = ({ dataSource }) => {
    // NOTE: once the clone data is filled in, we can use the id as the key
    const dataSourceWithKey = dataSource.map((data, index) => {
        return { ...data, clone_number: `cl.${data.clone_number}`, key: index };
    });
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
            title: "Replicate",
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
                dataSource={dataSourceWithKey}
                pagination={false}
                bordered={false}
                rowClassName={row}
            />
        </>
    );
};

export default CloneTable;
