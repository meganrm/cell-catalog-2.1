import React from "react";
import { graphql, StaticQuery } from "gatsby";

import NormalTable from "../components/NormalTable";
import { CellLineStatus, UnpackedNormalCellLine } from "./types";

const CellLineTableTemplate = (props: QueryResult) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    const unpackedCellLines = cellLines.map(
        ({ node: cellLine }): UnpackedNormalCellLine => {
            return {
                path: cellLine.fields.slug,
                cellLineId: cellLine.frontmatter.cell_line_id,
                cloneNumber: cellLine.frontmatter.clone_number,
                alleleCount: cellLine.frontmatter.allele_count,
                fluorescentTag: cellLine.frontmatter.fluorescent_tag,
                tagLocation: cellLine.frontmatter.tag_location,
                parentalLine:
                    cellLine.frontmatter.parental_line.frontmatter.name,
                protein: cellLine.frontmatter.gene.frontmatter.protein,
                taggedGene: {
                    name: cellLine.frontmatter.gene.frontmatter.name,
                    symbol: cellLine.frontmatter.gene.frontmatter.symbol,
                },
                structure: cellLine.frontmatter.gene.frontmatter.structure,
                status: cellLine.frontmatter.status,
                certificateOfAnalysis: "",
                hPSCregCertificateLink: "",
                orderLink: "",
            };
        }
    );

    return <NormalTable cellLines={unpackedCellLines} />;
};

interface QueryResult {
    data: {
        allMarkdownRemark: {
            edges: {
                node: {
                    id: string;
                    fields: {
                        slug: string;
                    };
                    frontmatter: {
                        templateKey: string;
                        cell_line_id: number;
                        status: CellLineStatus;
                        clone_number: number;
                        tag_location: string;
                        fluorescent_tag: string;
                        allele_count: string;
                        parental_line: {
                            frontmatter: {
                                name: string;
                            };
                        };
                        gene: {
                            frontmatter: {
                                protein: string;
                                name: string;
                                symbol: string;
                                structure: string;
                            };
                        };
                    };
                };
            }[];
        };
    };
}
export default function CellLineTable() {
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
