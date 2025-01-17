import { Link } from "gatsby";
import React from "react";
import {
    UnpackedDiseaseCellLine,
    UnpackedNormalCellLine,
    CellLineStatus,
} from "../../component-queries/types";
import { formatCellLineId } from "../../utils";
import Icon from "@ant-design/icons";
import { Flex } from "antd";
import { WHITE } from "../../style/theme";
import { mdBreakpoint } from "./types";

const CertificateIcon = require("../../img/cert-icon.svg");

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
    render: (
        cellLineId: number,
        record: UnpackedDiseaseCellLine | UnpackedNormalCellLine
    ) => {
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
