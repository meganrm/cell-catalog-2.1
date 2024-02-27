import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";

interface IndexPageTemplateProps {
    mainPitch: {
        title: string;
        description: string;
    };
    products: {
        text: string;
        image: string;
    }[];
}

export const IndexPageTemplate = ({
    mainPitch,
    products,
}: IndexPageTemplateProps) => {
    return (
        <div>
            <section className="section section--gradient">
                <div className="container">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <div className="content">
                                        <div className="tile">
                                            <h1 className="title">
                                                {mainPitch.title}
                                            </h1>
                                        </div>
                                        <div className="tile">
                                            <h3 className="subtitle">
                                                {mainPitch.description}
                                            </h3>
                                        </div>
                                    </div>

                                    <Features gridItems={products} />
                                    <div className="column is-12">
                                        <h3 className="has-text-weight-semibold is-size-2">
                                            Cell Lines
                                        </h3>
                                        <div className="column is-12 has-text-centered">
                                            <Link
                                                className="btn"
                                                to="/cell-line"
                                            >
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const IndexPage = ({ data }: QueryResult) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexPageTemplate
                mainPitch={frontmatter.main_pitch}
                products={frontmatter.products}
            />
        </Layout>
    );
};

export default IndexPage;

interface QueryResult {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
                subtitle: string;
                main_pitch: {
                    title: string;
                    description: string;
                };
                products: {
                    text: string;
                    image: string;
                }[];
            };
        };
    };
}

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                subtitle
                main_pitch {
                    title
                    description
                }
                products {
                    text
                    image
                }
            }
        }
    }
`;
