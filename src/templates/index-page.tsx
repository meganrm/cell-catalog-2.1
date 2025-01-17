import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";

interface IndexPageTemplateProps {
    mainPitch: {
        title: string;
        description: string;
    };
}

export const IndexPageTemplate = ({ mainPitch }: IndexPageTemplateProps) => {
    return (
        <div>
            <h1 className="title">{mainPitch.title}</h1>
            <div className="tile">
                <p className="subtitle">{mainPitch.description}</p>
            </div>

            <h4 className="has-text-weight-semibold is-size-2">
                Select collection:
            </h4>
            <div className="column is-12 has-text-centered">
                <Link className="btn" to="/normal-catalog">
                    Cell Collection
                </Link>
            </div>
            <div className="column is-12 has-text-centered">
                <Link className="btn" to="/disease-catalog">
                    Disease Collection
                </Link>
            </div>
        </div>
    );
};

const IndexPage = ({ data }: QueryResult) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexPageTemplate mainPitch={frontmatter.main_pitch} />
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
            }
        }
    }
`;
