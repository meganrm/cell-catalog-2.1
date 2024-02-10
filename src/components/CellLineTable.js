import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

const CellLineTableTemplate = (props) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    console.log(cellLines);
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
                            <td>{cellLine.frontmatter.gene.protein}</td>
                            <td>{cellLine.frontmatter.clone_number}</td>
                            <td>
                                {cellLine.frontmatter.gene.gene_name} (
                                {cellLine.frontmatter.gene.gene_symbol})
                            </td>
                            <td>{cellLine.frontmatter.allele_count}</td>
                            <td>{cellLine.frontmatter.gene.structure}</td>
                            <td>{cellLine.frontmatter.fluorescent_tag}</td>
                            <td>{cellLine.frontmatter.tag_location}</td>
                            <td>{cellLine.frontmatter.parental_line}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

CellLineTable.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

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
                                    parental_line
                                    fluorescent_tag
                                    allele_count
                                    gene {
                                        protein
                                        gene_name
                                        gene_symbol
                                        structure
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={(data, count) => (
                <CellLineTableTemplate data={data} count={count} />
            )}
        />
    );
}
