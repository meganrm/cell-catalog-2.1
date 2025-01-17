import React, { useState } from "react";
import { Table, Flex } from "antd";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import {
    CellLineStatus,
    UnpackedNormalCellLine,
} from "../component-queries/types";

import useWindowWidth from "../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../constants";
import GeneDisplay from "./GeneDisplay";
import { getNormalTableColumns } from "./NormalTableColumns";

const {
    tableTitle,
    container,
    comingSoon,

    expandableContent,
    hoveredRow,
    dataComplete,
} = require("../style/table.module.css");

interface NormalTableProps {
    cellLines: any[];
}

const NormalTable = ({ cellLines }: NormalTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
    const inProgress = status?.toLowerCase() === "coming soon";

    const width = useWindowWidth();
    const isTablet = width < TABLET_BREAKPOINT;
    const isMobile = width < MOBILE_BREAKPOINT;

    const expandableConfig = {
        expandedRowRender: (record: UnpackedNormalCellLine, index: number) => (
            <Flex
                key={record.cellLineId}
                gap={16}
                justify="flex-start"
                className={expandableContent}
                wrap={"wrap"}
            >
                {isMobile && (
                    <div>
                        <label>Tagged Protein:</label>
                        <Flex vertical={true} key={record.protein}>
                            <span key={record.protein}>{record.protein}</span>
                        </Flex>
                    </div>
                )}
                <div>
                    <label>Gene Symbol & Name:</label>
                    <span>
                        <GeneDisplay gene={record.taggedGene} />
                    </span>
                </div>
            </Flex>
        ),
    };

    const onCellInteraction = (
        record: UnpackedNormalCellLine,
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

    return (
        <>
            <Table
                key="cell-line-table"
                className={[container, inProgress ? comingSoon : ""].join(" ")}
                rowClassName={(record) =>
                    record.status === CellLineStatus.DataComplete
                        ? dataComplete
                        : ""
                }
                title={() => (
                    <Flex align="center">
                        <h3 className={tableTitle}>Cell Line Catalog</h3>
                    </Flex>
                )}
                scroll={{ x: "max-content" }}
                pagination={false}
                expandable={isTablet ? expandableConfig : undefined}
                columns={getNormalTableColumns(onCellInteraction, inProgress)}
                dataSource={cellLines}
            />
        </>
    );
};

export default NormalTable;
