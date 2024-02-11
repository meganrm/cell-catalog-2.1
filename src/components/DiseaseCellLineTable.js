import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

const DiseaseCellLineTableTemplate = (props) => {
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
                            {/* <td>{cellLine.frontmatter.gene.protein}</td> */}
                            <td>{cellLine.frontmatter.clone_number}</td>
                            <td>
                                {/* {cellLine.frontmatter.gene.name} (
                                {cellLine.frontmatter.gene.symbol}) */}
                            </td>
                            <td>{cellLine.frontmatter.allele_count}</td>
                            {/* <td>{cellLine.frontmatter.gene.structure}</td> */}
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
                            frontmatter: {
                                templateKey: { eq: "disease" }
                            }
                        }
                    ) {
                        edges {
                            node {
                                id
                                fields {
                                    slug
                                }
                                frontmatter {
                                    templateKey
                                }
                            }
                        }
                    }
                }
            `}
            render={(data, count) => (
                <DiseaseCellLineTableTemplate data={data} count={count} />
            )}
        />
    );
}
