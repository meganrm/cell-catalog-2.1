import React from "react";
import { graphql, StaticQuery } from "gatsby";
import DiseaseCellLineQuery from "./DiseaseCellLines";
import { DiseaseFrontmatter } from "./types";

export interface QueryResult {
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
    status: string;
}

const DiseaseTemplate = (props: QueryResult) => {
    const { edges: diseases } = props.data.allMarkdownRemark;

    const unpackedDiseases = diseases
        .map(({ node: disease }) => {
            const { name, gene, acknowledgements, status } =
                disease.frontmatter;
            return {
                name,
                geneSymbol: gene.frontmatter.symbol,
                geneName: gene.frontmatter.name,
                acknowledgements,
                status,
            };
        })
        .sort((a, b) => {
            if (a.status === "Coming soon") {
                return 1;
            } else if (b.status === "Coming soon") {
                return -1;
            } else {
                return a.name.localeCompare(b.name);
            }
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
                                    status
                                    acknowledgements
                                    gene {
                                        frontmatter {
                                            symbol
                                            name
                                        }
                                    }
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
