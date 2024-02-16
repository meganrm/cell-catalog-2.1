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
            name: "Frontmatter",
            fields: {
                parental_line: {
                    type: "ParentLine",
                    resolve: (source, args, context, info) => {
                        return context.nodeModel
                            .findOne({
                                type: "MarkdownRemark",
                                query: {
                                    filter: {
                                        frontmatter: {
                                            cell_line_id: { eq: source.parental_line },
                                        },
                                    },
                                },
                            })
                            .then((data) => {
                                console.log("DATA", data)
                                return {
                                    gene: data.frontmatter.gene || "",
                                    cell_line_id: data.frontmatter.cell_line_i || "WTC",
                                    clone_number: data.frontmatter.clone_numbe || "",
                                    structure: data.frontmatter.structur || "",
                                    tag_location: data.frontmatter.tag_locatio || "",
                                    fluorescent_tag:
                                        data.frontmatter.fluorescent_tag || "",
                                };
                            });
                    },
                },
            },
        }),
        schema.buildObjectType({
            name: "ParentLine",
            fields: {
                gene: "GeneData!",
                cell_line_id: "String!",
                clone_number: "Int!",
                tag_location: "String!",
                fluorescent_tag: "String!",
            },
            interfaces: ["Node"],
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
                    )}.js`
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
