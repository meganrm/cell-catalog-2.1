import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

const CellLineTableTemplate = (props) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;

    return (
        <table className="">
            <thead>
                <tr>
                    <th>Cell Line ID</th>
                    <th>Clone Number</th>
                    <th>Terminal Tag</th>
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
                            <td>
                                <p>{cellLine.frontmatter.clone_number}</p>
                            </td>
                            <td>
                                <p>{cellLine.frontmatter.terminal_tagged}</p>
                            </td>
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
                                    terminal_tagged
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
