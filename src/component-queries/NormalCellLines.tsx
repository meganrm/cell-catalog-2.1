import React from "react";
import { graphql, StaticQuery } from "gatsby";

import { NormalCellLineNode, UnpackedNormalCellLine } from "./types";
import { convertFrontmatterToNormalCellLines } from "./convert-data";
import CellLineTable, { TableType } from "../components/CellLineTable";

const CellLineTableTemplate = (props: QueryResult) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    const unpackedCellLines = cellLines.map(
        convertFrontmatterToNormalCellLines
    );

    return (
        <CellLineTable
            tableName="Cell Line Catalog"
            cellLines={unpackedCellLines}
            footerContents={""}
            tableType={TableType.Normal}
            status={""}
        />
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
                        filter: {
                            frontmatter: {
                                templateKey: { eq: "cell-line" }
                                status: { eq: "done" }
                                cell_line_id: { ne: 0 }
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
