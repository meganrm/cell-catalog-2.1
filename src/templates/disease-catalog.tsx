import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Diseases from "../component-queries/Diseases";
import Content, { HTMLContent } from "../components/Content";

interface DiseaseCatalogTemplateProps {
    title: string;
    content: string;
    contentComponent?: JSX.ElementType;
    footerText: string;
}
// eslint-disable-next-line
export const DiseaseCatalogTemplate = ({
    title,
    content,
    contentComponent,
    footerText,
}: DiseaseCatalogTemplateProps) => {
    const PageContent = contentComponent || Content;

    return (
        <section className="section section--gradient">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="section">
                            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                                {title}
                            </h2>
                            <PageContent
                                className="content"
                                content={content}
                            />
                            <Diseases />
                            <div>{footerText}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface QueryResult {
    data: {
        markdownRemark: {
            html: string;
            frontmatter: {
                title: string;
                footer_text: string;
                main: {
                    heading: string;
                    description: string;
                };
            };
        };
    };
}

const DiseaseCatalog = ({ data }: QueryResult) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <DiseaseCatalogTemplate
                contentComponent={HTMLContent} 
                title={post.frontmatter.title}
                content={post.html}
                footerText={post.frontmatter.footer_text}
            />
        </Layout>
    );
};

DiseaseCatalog.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DiseaseCatalog;

export const aboutPageQuery = graphql`
    query DiseaseCatalog($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                footer_text
                main {
                    heading
                    description
                }
            }
        }
    }
`;
