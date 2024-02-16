import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import DiseaseTable from "../components/DiseaseTable";

const groupLines = (diseases, cellLines) => {
    const initObject = diseases.reduce((acc, cur) => {
        acc[cur.name] = [];
        return acc
    }, {});
    return cellLines.reduce((acc, cellLine) => {
        const { disease } = cellLine.node.frontmatter;
        acc[disease].push(cellLine.node.frontmatter);
        return acc
    }, initObject)
}

const DiseaseCellLineTemplate = (props) => {
    const { edges: cellLines } = props.data.allMarkdownRemark;
    const { diseases } = props;
    const groupedCellLines = groupLines(diseases, cellLines)
    return diseases.map((disease) => {
        if (!groupedCellLines[disease.name].length) {
            return null;
        }
        return (
            <div key={disease.name}>
                <DiseaseTable
                    diseaseName={disease.name}
                    diseaseGeneSymbol={disease.geneSymbol}
                    diseaseGeneName={disease.geneName}
                    diseaseCellLines={groupedCellLines[disease.name]}
                />
            </div>
        );
    })

};

DiseaseCellLineQuery.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default function DiseaseCellLineQuery(props) {
    return (
        <StaticQuery
            query={graphql`
                query DiseaseCellLineQuery {
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
                                    parental_line {
                                        cell_line_id
                                    }
                                    disease
                                    snp
                                    clones
                                }
                            }
                        }
                    }
                }
            `}
            render={(data, count) => (
                <DiseaseCellLineTemplate
                    data={data}
                    diseases={props.diseases}
                />
            )}
        />
    );
}
