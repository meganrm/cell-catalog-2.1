import React from "react";
import { graphql, StaticQuery } from "gatsby";

import {
    CellLineStatus,
    NormalCellLineNode,
    UnpackedNormalCellLine,
} from "./types";
import { convertFrontmatterToNormalCellLines } from "./convert-data";
import CellLineTable from "../components/CellLineTable";
import { getNormalTableColumns } from "../components/CellLineTable/NormalTableColumns";
import { MOBILE_BREAKPOINT } from "../constants";
import useWindowWidth from "../hooks/useWindowWidth";
import { getNormalTableMobileConfig } from "../components/CellLineTable/MobileView";

const CellLineTableTemplate = (props: QueryResult) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    const inProgressCellLines = [] as UnpackedNormalCellLine[];
    const finishedCellLines = [] as UnpackedNormalCellLine[];
    cellLines.forEach((cellLine) => {
        const unPackedCellLine = convertFrontmatterToNormalCellLines(cellLine);
        if (unPackedCellLine.status === CellLineStatus.InProgress) {
            inProgressCellLines.push(unPackedCellLine);
        } else {
            finishedCellLines.push(unPackedCellLine);
        }
    });
    const width = useWindowWidth();
    const isMobile = width < MOBILE_BREAKPOINT;

    return (
        <>
            <CellLineTable
                tableName="Cell Line Catalog"
                cellLines={finishedCellLines}
                footerContents={""}
                released={true}
                columns={getNormalTableColumns(false)}
                mobileConfig={getNormalTableMobileConfig(isMobile)}
            />
            <CellLineTable
                tableName="Cell Line Catalog"
                cellLines={inProgressCellLines}
                footerContents={""}
                released={false}
                columns={getNormalTableColumns(true)}
                mobileConfig={getNormalTableMobileConfig(isMobile)}
            />
        </>
    );
};

interface QueryResult {
    data: {
        allMarkdownRemark: {
            edges: {
                node: NormalCellLineNode;
            }[];
        };
    };
}
export default function NormalCellLines() {
    return (
        <StaticQuery
            query={graphql`
                query CellLineTableQuery {
                    allMarkdownRemark(
                        sort: { frontmatter: { cell_line_id: ASC } }
                        filter: {
                            frontmatter: {
                                templateKey: { eq: "cell-line" }
                                cell_line_id: { ne: 0 }
                                status: { ne: "hide" }
                            }
                        }
                    ) {
                        edges {
                            node {
                                excerpt(pruneLength: 400)
                                id
                                fields {
                                    slug
                                }
                                frontmatter {
                                    templateKey
                                    cell_line_id
                                    clone_number
                                    tag_location
                                    fluorescent_tag
                                    allele_count
                                    status
                                    gene {
                                        frontmatter {
                                            protein
                                            structure
                                            name
                                            symbol
                                        }
                                    }
                                    parental_line {
                                        frontmatter {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={(data: any) => <CellLineTableTemplate data={data} />}
        />
    );
}
