import React, { useState } from "react";
import { Table, Tag, Flex } from "antd";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import { HTMLContent } from "../shared/Content";
import { CellLineStatus } from "../../component-queries/types";

import useWindowWidth from "../../hooks/useWindowWidth";
import { TABLET_BREAKPOINT } from "../../constants";
import { TableStatus, UnpackedCellLine } from "./types";

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
    cellLines: UnpackedCellLine[];
    footerContents: string;
    released: boolean;
    columns: any;
    mobileConfig?: any;
}

const CellLineTable = ({
    tableName,
    cellLines,
    footerContents,
    released,
    columns,
    mobileConfig,
}: CellLineTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
    const inProgress = !released;
    const width = useWindowWidth();
    const isTablet = width < TABLET_BREAKPOINT;

    const onCellInteraction = (
        record: UnpackedCellLine,
        index: number | undefined
    ): {} => {
        // creates a hover effect for the whole row, and takes the user to
        // the sub-page for the cell line. The reason
        // this couldn't be done at the row level, is that we have
        // two columns that are independently clickable and therefore
        // clicking on them shouldn't trigger the page change
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

    const interactiveColumns = columns.map((column: any) => {
        // the two clickable columns are the order cell line and
        // CoA column. They do not have the hover effect and
        // should not take you to the cell line page
        if (column.className?.includes("action-column")) {
            column;
        }
        return {
            ...column,
            onCell: onCellInteraction,
        };
    });

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
                            <Tag color="#00215F" style={{ color: "#fff" }}>
                                {TableStatus.ComingSoon}
                            </Tag>
                        ) : null}
                    </Flex>
                )}
                scroll={{ x: "max-content" }}
                pagination={false}
                expandable={isTablet ? mobileConfig : undefined}
                columns={interactiveColumns}
                dataSource={cellLines}
            />
            <div className={footer}>
                <HTMLContent content={footerContents} />
            </div>
        </>
    );
};

export default CellLineTable;
