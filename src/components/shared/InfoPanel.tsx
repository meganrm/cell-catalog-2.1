import { Descriptions } from "antd";
import React from "react";
import type { DescriptionsProps } from "antd";

interface InfoPanelProps {
    data: DescriptionsProps["items"];
}

const { container } = require("../../style/info-panel.module.css");

const InfoPanel: React.FC<InfoPanelProps> = ({ data }) => {
    return (
        <div className={container}>
            <Descriptions
                items={data}
                column={1}
                layout="horizontal"
                colon={false}
                labelStyle={{
                    alignItems: "center",
                    fontSize: "14px",
                }}
                contentStyle={{
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "semi-bold",
                    lineHeight: "1px",
                }}
            />
        </div>
    );
};

export default InfoPanel;
