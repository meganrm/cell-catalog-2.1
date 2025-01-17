import { Link } from "gatsby";
import React from "react";
import { Flex } from "antd";
import Icon from "@ant-design/icons";

import { CellLineStatus } from "../../component-queries/types";
import { formatCellLineId } from "../../utils";
import { WHITE } from "../../style/theme";
import { mdBreakpoint, UnpackedCellLine } from "./types";

const CertificateIcon = require("../../img/cert-icon.svg");
const Tube = require("../../img/tube.svg");

const {
    cellLineId,
    actionColumn,
    actionButton,
} = require("../../style/table.module.css");

export const cellLineIdColumn = {
    title: "Cell Collection ID",
    key: "cellLineId",
    className: cellLineId,
    dataIndex: "cellLineId",
    fixed: "left" as const,
    render: (cellLineId: number, record: UnpackedCellLine) => {
        const cellLine = (
            <h4 key={cellLineId}>{formatCellLineId(cellLineId)}</h4>
        );
        return record.status === CellLineStatus.DataComplete ? (
            <Link to={record.path}>{cellLine}</Link>
        ) : (
            cellLine
        );
    },
};

export const certificateOfAnalysisColumn = {
    title: "",
    key: "certificateOfAnalysis",
    dataIndex: "certificateOfAnalysis",
    className: actionColumn,
    fixed: "right" as const,
    responsive: mdBreakpoint,
    render: (certificateOfAnalysis: string) => {
        return (
            certificateOfAnalysis && (
                <a
                    key={certificateOfAnalysis}
                    className={actionButton}
                    href={certificateOfAnalysis}
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
};

export const getObtainLineColumn = (inProgress: boolean) => ({
    title: "",
    key: "orderLink",
    dataIndex: "orderLink",
    className: actionColumn,
    fixed: "right" as const,
    render: (orderLink: string) => {
        if (inProgress) {
            return <>{""}</>; // still want a blank column
        } else {
            return (
                <a
                    key={orderLink}
                    className={actionButton}
                    href={orderLink}
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
});
