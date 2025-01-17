import React, { useState } from "react";
import { Table, Tag, Flex } from "antd";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import { HTMLContent } from "./shared/Content";
import {
    CellLineStatus,
    UnpackedDiseaseCellLine,
} from "../component-queries/types";
import { getCloneSummary } from "../utils";

import useWindowWidth from "../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../constants";
import GeneDisplay from "./GeneDisplay";
import CloneSummary from "./CloneSummary";
import { getDiseaseTableColumns } from "./DiseaseTableColumns";

const {
    tableTitle,
    container,
    comingSoon,
    footer,
    expandableContent,
    hoveredRow,
    dataComplete,
} = require("../style/table.module.css");

interface DiseaseTableProps {
    diseaseName: string;
    diseaseCellLines: UnpackedDiseaseCellLine[];
    acknowledgements: string;
    status: string;
}

const DiseaseTable = ({
    diseaseName,
    diseaseCellLines,
    acknowledgements,
    status,
}: DiseaseTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
    const inProgress = status?.toLowerCase() === "coming soon";

    const width = useWindowWidth();
    const isTablet = width < TABLET_BREAKPOINT;
    const isMobile = width < MOBILE_BREAKPOINT;

    const expandableConfig = {
        expandedRowRender: (record: UnpackedDiseaseCellLine, index: number) => (
            <Flex
                key={record.cellLineId}
                gap={16}
                justify="flex-start"
                className={expandableContent}
                wrap={"wrap"}
            >
                {isMobile && (
                    <div>
                        <label>SNP:</label>
                        <Flex vertical={true} key={record.snp}>
                            <span key={"snp-0"}>
                                {record.snp.split(":")[0]}:{" "}
                            </span>
                            <span key={"snp-1"}>
                                {record.snp.split(":")[1]}
                            </span>
                        </Flex>
                    </div>
                )}
                <div>
                    <label>Gene Symbol & Name:</label>
                    <span>
                        <GeneDisplay gene={record.mutatedGene} />
                    </span>
                </div>
                <div>
                    <label>Clones:</label>
                    <CloneSummary
                        numMutants={getCloneSummary(record.clones).numMutants}
                        numIsogenics={
                            getCloneSummary(record.clones).numIsogenics
                        }
                        index={index}
                    />
                </div>
            </Flex>
        ),
    };

    const onCellInteraction = (
        record: UnpackedDiseaseCellLine,
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
                key={diseaseName}
                className={[container, inProgress ? comingSoon : ""].join(" ")}
                rowClassName={(record) =>
                    record.status === CellLineStatus.DataComplete
                        ? dataComplete
                        : ""
                }
                title={() => (
                    <Flex align="center">
                        <h3 className={tableTitle}>{diseaseName}</h3>
                        {inProgress ? (
                            <Tag color="#00215F">{status}</Tag>
                        ) : null}
                    </Flex>
                )}
                scroll={{ x: "max-content" }}
                pagination={false}
                expandable={isTablet ? expandableConfig : undefined}
                columns={getDiseaseTableColumns(onCellInteraction, inProgress)}
                dataSource={diseaseCellLines}
            />
            <div className={footer}>
                <HTMLContent content={acknowledgements} />
            </div>
        </>
    );
};

export default DiseaseTable;
