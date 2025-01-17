import React, { useState } from "react";
import { Table, Tag, Flex } from "antd";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import { HTMLContent } from "./shared/Content";
import {
    CellLineStatus,
    UnpackedDiseaseCellLine,
    UnpackedNormalCellLine,
} from "../component-queries/types";

import useWindowWidth from "../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../constants";
import { getDiseaseTableColumns } from "./DiseaseTableColumns";
import { getNormalTableColumns } from "./NormalTableColumns";
import { getMobileConfig } from "./CellLineTableConfig";

const {
    tableTitle,
    container,
    comingSoon,
    footer,
    hoveredRow,
    dataComplete,
} = require("../style/table.module.css");

export enum TableType {
    Disease,
    Normal,
}

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

    const expandableConfig = getMobileConfig(tableType, isMobile);

    const onCellInteraction = (
        record: UnpackedDiseaseCellLine | UnpackedNormalCellLine,
        index: number | undefined
    ) => {
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

    const columns =
        tableType === TableType.Disease
            ? getDiseaseTableColumns(onCellInteraction, inProgress)
            : getNormalTableColumns(onCellInteraction, inProgress);

    const typedCellLines =
        tableType === TableType.Disease
            ? (cellLines as UnpackedDiseaseCellLine[])
            : (cellLines as UnpackedNormalCellLine[]);
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
                expandable={isTablet ? (expandableConfig as any) : undefined}
                columns={columns as any}
                dataSource={typedCellLines as any}
            />
            <div className={footer}>
                <HTMLContent content={footerContents} />
            </div>
        </>
    );
};

export default CellLineTable;
