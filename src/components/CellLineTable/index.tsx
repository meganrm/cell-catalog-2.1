import React, { useState } from "react";
import { Table, Tag, Flex } from "antd";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import { HTMLContent } from "../shared/Content";
import {
    CellLineStatus,
    UnpackedDiseaseCellLine,
    UnpackedNormalCellLine,
} from "../../component-queries/types";

import useWindowWidth from "../../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../../constants";
import { getConfig } from "./config";
import { NormalTableConfig, TableType } from "./types";

const {
    tableTitle,
    container,
    comingSoon,
    footer,
    hoveredRow,
    dataComplete,
} = require("../../style/table.module.css");

interface CellLineTableProps {
    tableName: string;
    cellLines: UnpackedDiseaseCellLine[] | UnpackedNormalCellLine[];
    footerContents: string;
    status: string;
    tableType: TableType;
}

const CellLineTable = ({
    tableName,
    cellLines,
    footerContents,
    status,
    tableType,
}: CellLineTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
    const inProgress = status?.toLowerCase() === "coming soon";

    const width = useWindowWidth();
    const isTablet = width < TABLET_BREAKPOINT;
    const isMobile = width < MOBILE_BREAKPOINT;

    const onCellInteraction = (
        record: UnpackedDiseaseCellLine | UnpackedNormalCellLine,
        index: number | undefined
    ): {} => {
        if (index === undefined) {
            return {};
        }
        return {
            className: index === hoveredRowIndex ? hoveredRow : "",
            onMouseEnter: () => setHoveredRowIndex(index),
            onMouseLeave: () => setHoveredRowIndex(-1),
            onClick: () => {
                if (record.status === CellLineStatus.DataComplete) {
                    navigate(record.path);
                }
            },
        };
    };

    const config = getConfig(
        tableType,
        isMobile,
        onCellInteraction,
        inProgress,
        cellLines
    );
    const isNormalConfig = (config): config is NormalTableConfig => {
        return tableType === TableType.Normal;
    };

    const typedConfig = isNormalConfig(config) ? config : config;

    const {
        columns,
        expandableConfig,
        cellLines: typedCellLines,
    } = typedConfig;
    return (
        <>
            <Table
                key={tableName}
                className={[container, inProgress ? comingSoon : ""].join(" ")}
                rowClassName={(record) =>
                    record.status === CellLineStatus.DataComplete
                        ? dataComplete
                        : ""
                }
                title={() => (
                    <Flex align="center">
                        <h3 className={tableTitle}>{tableName}</h3>
                        {inProgress ? (
                            <Tag color="#00215F">{status}</Tag>
                        ) : null}
                    </Flex>
                )}
                scroll={{ x: "max-content" }}
                pagination={false}
                expandable={isTablet ? expandableConfig : undefined}
                columns={columns}
                dataSource={typedCellLines}
            />
            <div className={footer}>
                <HTMLContent content={footerContents} />
            </div>
        </>
    );
};

export default CellLineTable;
