import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

const DiseaseCellLineTableTemplate = (props) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    console.log(cellLines);
    return (
        <table className="">
        </table>
    );
};

DiseaseCellLineTable.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default function DiseaseCellLineTable() {
    return (
        <StaticQuery
            query={graphql`
                query DiseaseCellLineTableQuery {
                    allMarkdownRemark(
                        filter: {
                            frontmatter: {
                                templateKey: { eq: "disease-cell-line" }
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
                                    cell_line_id
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
