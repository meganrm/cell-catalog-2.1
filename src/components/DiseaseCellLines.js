import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import DiseaseTable from "./DiseaseTable";

const groupLines = (diseases, cellLines) => {
    const initObject = diseases.reduce((acc, cur) => {
        acc[cur.name] = {};
        return acc
    }, {});
    return cellLines.reduce((acc, cellLine) => {
        const { disease, parental_line } = cellLine.node.frontmatter;
        if (!acc[disease][parental_line]) {
            acc[disease][parental_line] = [];
        }
        acc[disease][parental_line].push(cellLine.node.frontmatter);
        return acc
    }, initObject)
}

const DiseaseCellLineTableTemplate = (props) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    const { diseases } = props;
    const groupedCellLines = groupLines(diseases, cellLines)
    return diseases.map((disease) => {
        return (
            <div key={disease.name}>
                <DiseaseTable
                    diseaseName={disease.name}
                    diseaseGene={disease.gene}
                    groupedCellLines={groupedCellLines[disease.name]}
                />
            </div>
        );
    })

};

DiseaseCellLineTable.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default function DiseaseCellLineTable(props) {
    return (
        <StaticQuery
            query={graphql`
                query DiseaseCellLineTableQuery {
                    allMarkdownRemark(
                        filter: {
                            frontmatter: {
                                templateKey: { eq: "disease-cell-line" },
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
                                    parental_line
                                    disease
                                }
                            }
                        }
                    }
                }
            `}
            render={(data, count) => (
                <DiseaseCellLineTableTemplate data={data} diseases={props.diseases} />
            )}
        />
    );
}
