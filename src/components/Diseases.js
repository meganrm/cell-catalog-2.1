import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import DiseaseCellLineTable from "./DiseaseCellLines";

const DiseaseTemplate = (props) => {
    const { edges: diseases } = props.data.allMarkdownRemark;
    console.log("diseases", diseases);
    const unpackedDiseases = diseases.map(({ node: disease }) => {
        return {
            name: disease.frontmatter.name,
            gene: `${disease.frontmatter.gene.symbol} - ${disease.frontmatter.gene.name}`,
        };
    })
    return <DiseaseCellLineTable diseases={unpackedDiseases} />;

};

Diseases.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
};

export default function Diseases() {
    return (
        <StaticQuery
            query={graphql`
                query DiseasesQuery {
                    allMarkdownRemark(
                        filter: {
                            frontmatter: { templateKey: { in: "disease" } }
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
                                    name
                                    gene {
                                        name
                                        symbol
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={(data, count) => (
                <DiseaseTemplate data={data} />
            )}
        />
    );
}
