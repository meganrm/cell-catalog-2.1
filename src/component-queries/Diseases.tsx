import React from "react";
import { graphql, StaticQuery } from "gatsby";
import DiseaseCellLineQuery from "./DiseaseCellLines";

interface DiseaseFrontmatter {
    name: string;
    gene: {
        name: string;
        symbol: string;
    };
    acknowledgements: string;
}

interface QueryResult {
    data: {
        allMarkdownRemark: {
            edges: {
                node: {
                    id: string;
                    fields: {
                        slug: string;
                    };
                    frontmatter: DiseaseFrontmatter;
                };
            }[];
        };
    };
}

export interface UnpackedDisease {
    name: string;
    geneSymbol: string;
    geneName: string;
    acknowledgements: string;
}


const DiseaseTemplate = (props: QueryResult) => {
    const { edges: diseases } = props.data.allMarkdownRemark;

    const unpackedDiseases = diseases.map(({ node: disease }) => {
        return {
            name: disease.frontmatter.name,
            geneSymbol: disease.frontmatter.gene.symbol,
            geneName: disease.frontmatter.gene.name,
            acknowledgements: disease.frontmatter.acknowledgements,
        };
    });
    return (
        <DiseaseCellLineQuery
            diseases={unpackedDiseases as UnpackedDisease[]}
        />
    );
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
                                    acknowledgements
                                }
                            }
                        }
                    }
                }
            `}
            render={(data) => <DiseaseTemplate data={data} />}
        />
    );
}
