import React from "react";
import { Steps } from "antd";
import { CellLineStatus } from "../../component-queries/types";

interface ProgressPreviewProps {
    status: CellLineStatus;
}
const ProgressPreview = ({ status }: ProgressPreviewProps) => {
    const statusMap = {
        [CellLineStatus.DataComplete]: 2,
        [CellLineStatus.Released]: 1,
        [CellLineStatus.InProgress]: 0,
    };
    return (
        <Steps
            style={{
                padding: "20px 50px 20px 20px",
                backgroundColor: "#f0f0f0",
            }}
            size="small"
            current={statusMap[status]}
            items={[
                {
                    title: "Cell line initiated",
                },
                {
                    title: "Released",
                    description: "Visible on main table",
                },
                {
                    title: "QC data entered",
                    description: "Subpages are complete",
                },
            ]}
        />
    );
};

export default ProgressPreview;
