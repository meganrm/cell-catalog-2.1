import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";

const CellLineTableTemplate = (props: QueryResult) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    return (
        <table className="">
            <thead>
                <tr>
                    <th>Cell Line ID</th>
                    <th>Protein</th>
                    <th>Clone ID</th>
                    <th>Gene Name (gene symbol)</th>
                    <th>Tagged alleles</th>
                    <th>Structure</th>
                    <th>Fluorescent Tag</th>
                    <th>Tag Location</th>
                    <th>Parental Line</th>
                </tr>
            </thead>
            <tbody>
                {cellLines &&
                    cellLines.map(({ node: cellLine }) => (
                        <tr className="" key={cellLine.id}>
                            <td className="is-child">
                                <Link to={cellLine.fields.slug}>
                                    <h4>
                                        AICS-{cellLine.frontmatter.cell_line_id}
                                    </h4>
                                </Link>
                            </td>
                            <td>{cellLine.frontmatter.gene.frontmatter.protein}</td>
                            <td>{cellLine.frontmatter.clone_number}</td>
                            <td>
                                {cellLine.frontmatter.gene.frontmatter.name} (
                                {cellLine.frontmatter.gene.frontmatter.symbol})
                            </td>
                            <td>{cellLine.frontmatter.allele_count}</td>
                            <td>{cellLine.frontmatter.gene.frontmatter.structure}</td>
                            <td>{cellLine.frontmatter.fluorescent_tag}</td>
                            <td>{cellLine.frontmatter.tag_location}</td>
                            {/* <td>{cellLine.frontmatter.parental_line.frontmatter.name}</td> */}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
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
                        cell_line_id: string;
                        clone_number: string;
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
                            frontmatter: { templateKey: { eq: "cell-line" } }
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
            render={(data: any) => (
                <CellLineTableTemplate data={data} />
            )}
        />
    );
}
