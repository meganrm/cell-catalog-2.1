import React, { useState } from "react";
import { Link } from "gatsby";
import { Table, Tag, Flex } from "antd";
import Icon from "@ant-design/icons";
// TODO: debug gatsby navigate throwing errors when passed strings
import { navigate } from "@reach/router";

import {
    CellLineStatus,
    UnpackedDiseaseCellLine,
} from "../component-queries/types";
import { formatCellLineId } from "../utils";
import { WHITE } from "../style/theme";
import useWindowWidth from "../hooks/useWindowWidth";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../constants";

const Tube = require("../img/tube.svg");
const CertificateIcon = require("../img/cert-icon.svg");

const {
    tableTitle,
    container,
    actionButton,
    comingSoon,
    actionColumn,
    clones,
    cellLineId,
    expandableContent,
    hoveredRow,
    dataComplete,
} = require("../style/disease-table.module.css");

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
                    {/* <span>{record.gene}</span> */}
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
                columns={[
                    {
                        title: "Cell Collection ID",
                        key: "cellLineId",
                        className: cellLineId,
                        dataIndex: "cellLineId",
                        fixed: "left",
                        render: (cellLineId, record) => {
                            const cellLine = (
                                <h4 key={cellLineId}>
                                    {formatCellLineId(cellLineId)}
                                </h4>
                            );
                            return record.status ===
                                CellLineStatus.DataComplete ? (
                                <Link to={record.path}>{cellLine}</Link>
                            ) : (
                                cellLine
                            );
                        },
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Gene Symbol & Name",
                        width: 280,
                        key: "gene",
                        dataIndex: "gene",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Clone Number",
                        key: "cloneNumber",
                        dataIndex: "clones",
                        className: clones,
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Allele Count",
                        key: "alleleCount",
                        dataIndex: "alleleCount",
                        // className: clones,
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Fluorescent Tag",
                        key: "fluorescentTag",
                        dataIndex: "fluorescentTag",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },
                    {
                        title: "Tag Location",
                        key: "tagLocation",
                        dataIndex: "tagLocation",
                        responsive: ["md"],
                        onCell: onCellInteraction,
                    },

                    {
                        title: "",
                        key: "order_link",
                        dataIndex: "order_link",
                        className: actionColumn,
                        fixed: "right",
                        render: (order_link) => {
                            if (inProgress) {
                                return <>{""}</>; // still want a blank column
                            } else {
                                return (
                                    <a
                                        key={order_link}
                                        className={actionButton}
                                        href={order_link}
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
                    },
                    {
                        title: "",
                        key: "certificate_of_analysis",
                        dataIndex: "certificate_of_analysis",
                        className: actionColumn,
                        fixed: "right",
                        responsive: ["md"],
                        render: (certificate_of_analysis) => {
                            return (
                                certificate_of_analysis && (
                                    <a
                                        key={certificate_of_analysis}
                                        className={actionButton}
                                        href={certificate_of_analysis}
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
                    },
                ]}
                dataSource={cellLines}
            />
        </>
    );
};

export default NormalTable;
