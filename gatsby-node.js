const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions;
    const typeDefs = [
        "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
        schema.buildObjectType({
            name: "Frontmatter",
            fields: {
                parental_line: {
                    type: "ParentLine",
                    resolve: async (source, args, context, info) => {
                        const data = await context.nodeModel.findOne({
                            type: "MarkdownRemark",
                            query: {
                                filter: {
                                    frontmatter: {
                                        cell_line_id: {
                                            eq: source.parental_line,
                                        },
                                    },
                                },
                            },
                        });
                        if (!data) {
                            return { name: source.parental_line };
                        }
                        console.log("PARENT", data.parent)
                        const parentalGene = data.frontmatter.gene;

                        const parentalGeneData =
                            await context.nodeModel.findOne({
                                type: "MarkdownRemark",
                                query: {
                                    filter: {
                                        frontmatter: {
                                            symbol: {
                                                eq: parentalGene,
                                            },
                                        },
                                    },
                                },
                            });
                        const parentData = data.frontmatter;
                        return {
                            gene: {
                                symbol: parentalGeneData.frontmatter.symbol,
                                name: parentalGeneData.frontmatter.name,
                                protein:
                                    parentalGeneData.frontmatter.protein || "",
                                structure:
                                    parentalGeneData.frontmatter.structure ||
                                    "",
                            },
                            cell_line_id: parentData.cell_line_id || "WTC",
                            clone_number: parentData.clone_number || "",
                            structure: parentData.structure || "",
                            tag_location: parentData.tag_location || [],
                            fluorescent_tag: parentData.fluorescent_tag || [],
                            thumbnail_image: `../cell-line/AICS-${parentData.cell_line_id}/${parentData.thumbnail_image}`,
                        };
                    },
                },
            },
        }),
        schema.buildObjectType({
            name: "Frontmatter",
            fields: {
                gene: {
                    type: "GeneData",
                    resolve: (source, args, context, info) => {
                        return context.nodeModel
                            .findOne({
                                type: "MarkdownRemark",
                                query: {
                                    filter: {
                                        frontmatter: {
                                            symbol: { eq: source.gene },
                                        },
                                    },
                                },
                            })
                            .then((data) => {
                                return {
                                    symbol: data.frontmatter.symbol,
                                    name: data.frontmatter.name,
                                    protein: data.frontmatter.protein || "",
                                    structure: data.frontmatter.structure || "",
                                };
                            });
                    },
                },
            },
        }),

        schema.buildObjectType({
            name: "GeneData",
            fields: {
                name: "String!",
                symbol: "String!",
                protein: "String!",
                structure: "String!",
            },
            interfaces: ["Node"],
        }),
        schema.buildObjectType({
            name: "ParentLine",
            fields: {
                name: "String",
                gene: "GeneData",
                cell_line_id: "Int",
                clone_number: "Int",
                thumbnail_image: "File",
                tag_location: ["String"],
                fluorescent_tag: ["String"],
            },
            interfaces: ["Node"],
        }),
    ];
    createTypes(typeDefs);
};

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
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
    `).then((result) => {
        if (result.errors) {
            result.errors.forEach((e) => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        const edges = result.data.allMarkdownRemark.edges;
        edges.forEach((edge) => {
            const id = edge.node.id;
            createPage({
                path: edge.node.fields.slug,
                component: path.resolve(
                    `src/templates/${String(
                        edge.node.frontmatter.templateKey
                    )}.tsx`
                ),
                // additional data can be passed via context
                context: {
                    id,
                },
            });
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};
